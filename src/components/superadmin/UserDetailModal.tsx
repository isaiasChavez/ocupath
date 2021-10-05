import React, { useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
// import CustomInputWithValidations from '@material-ui/core/CustomInputWithValidations'
import MomentUtils from '@date-io/moment'
import { MIN_INVITATIONS, MAX_INVITATIONS } from '../../config'
import Skeleton from 'react-loading-skeleton'
import NumberFormat from 'react-number-format'
import { COLORS, USERS_TYPES } from '../../types/'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import UserContext, {
  AddNewSuscriptionSuscriptionDTO, DeleteSuscriptionSuscriptionDTO,
} from '../../context/user/user.context'
import { Avatar, Box, Button, IconButton } from '@material-ui/core'
import moment from 'moment'
import { Spin, Button as ButtonAnt } from 'antd'
import {
  CustomInputWithValidations,
  propsCustomInputErrors,
} from '../../../pages/login'
import { NewPeriodErrors } from '../../types/types'
import { Close } from '@material-ui/icons'
import AskModal from '../general/AskModal'

export interface UserDetailModalProps {
  handleClose: Function
  isOpen: boolean
  type: USERS_TYPES
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  )
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  handleClose,
  isOpen,
  type,
}) => {
  const { selectedUser,loading } = useContext(UserContext)

  const [hasNewPeriod, setHasNewPeriod] = useState(false)

  const onClickNewPeriod = () => {
    setHasNewPeriod(!hasNewPeriod)
  }

  const costFormated = (cost: string): string => {
    let costNumber = parseInt(cost)
    if (costNumber % 1 === 0) {
      return `$ ${cost}.00`
    }

    return `$ ${cost}`
  }

  

  const body =  <>
  <Box
    m={0.5}
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      opacity: 0.5,
    }}
  >
    <IconButton
                disabled={loading}
                onClick={() => {
                  setHasNewPeriod(false)
                  handleClose()
                }}           
                 color="primary" aria-label="upload picture" component="span">
    <Close
      style={{
        cursor: 'pointer',
      }}
     
      />
      </IconButton>
  </Box>
  <Box className="animate-fadein" width="100%" height="100%" p={3}>
      <Box
        fontSize={24}
        mb={2}
        className="ITCAvantGardeStdBkBold"
        fontWeight="fontWeightBold"
      >
        {type === USERS_TYPES.ADMIN
          ? 'Company detail'
          : 'Guest detail'}
      </Box>
      <DataAdmin
        type={type}
        hasNewPeriod={hasNewPeriod}
        onClickNewPeriod={onClickNewPeriod}
      >
        <DataNewPeriod
          onClickNewPeriod={onClickNewPeriod}
          typeToUpdate={type}
          setHasNewPeriod={setHasNewPeriod}
          handleClose={handleClose}
        />
      </DataAdmin>
      <Box
        width="100%"
        display="flex"
        p={3}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Box width="50%" display="flex" mb={ hasNewPeriod?8:0}>
          <Box width="50%">
            <Box
              className="ITCAvantGardeStdBkSemiBold"
              fontWeight="fontWeightBold"
              pt={2}
              pb={2}
            >
              Grand total:
            </Box>
          </Box>
          <Box width="50%" display="flex" justifyContent="flex-end">
            <Box
              className="ITCAvantGardeStdBkSemiBold"
              fontWeight="fontWeightBold"
              pt={2}
              pb={2}
            >
              {costFormated(selectedUser.totalCost)}
            </Box>
          </Box>
        </Box>
      </Box>
  </Box>
    </>

  return (
    <>
      <Modal
        open={isOpen}
        onClose={(e) => {
          handleClose(e)
          setHasNewPeriod(false)
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box
          className="animate-fadein"
          width="50%"
          borderRadius={8}
          minWidth="48rem"
          maxWidth="70rem"
        >
          <Paper
            style={{
              maxHeight: '100vh',
              minHeight: '30rem',
              height: 'auto',
              overflowY: 'auto',
              borderRadius: '10px',
              position: 'relative',
            }}
            >
            {loading?
            <Box display='flex' position='absolute' top={0} bottom={0} left={0} right={0}justifyContent='center' alignItems="center">
              <Spin size="large"/>
            </Box>
            :body}
           
          </Paper>
        </Box>
      </Modal>
    </>
  )
}

export interface DataAdminProps {
  hasNewPeriod: boolean
  onClickNewPeriod: Function
  type: USERS_TYPES
}

const DataAdmin: React.FC<DataAdminProps> = ({
  hasNewPeriod,
  children,
  onClickNewPeriod,
  type,
}) => {
  const { selectedUser,deletePeriod } = useContext(UserContext)
  const [currentImage, setCurrentImage] = useState(null)
  const [isDeleteSuscriptionModalVisible, setisDeleteSuscriptionModalVisible] = useState<boolean>(false)
  const classes = useStyles()

  useEffect(() => {
    const heavyImage: HTMLImageElement = document.createElement('img')
    heavyImage.onload = () => setCurrentImage(heavyImage.src)
    heavyImage.src = selectedUser.thumbnail
  }, [selectedUser.thumbnail])

  const [loadingDelete, setLoadingDelete] = useState(false)

  const toggleDeletePeriodModal = ()=>{
    setisDeleteSuscriptionModalVisible(!isDeleteSuscriptionModalVisible)
  }

  const onDeletePeriod= async()=>{
    try {

      setisDeleteSuscriptionModalVisible(!isDeleteSuscriptionModalVisible)
      const isNewPeriodAdmin = type === USERS_TYPES.ADMIN
      const isNewPeriodGuest = type === USERS_TYPES.GUEST
      setLoadingDelete(true)
      const deleteSuscriptionSuscriptionDTO: DeleteSuscriptionSuscriptionDTO = new DeleteSuscriptionSuscriptionDTO(
        {
          typeToUpdate:type,
          adminUuidToUpdate: isNewPeriodAdmin ? selectedUser.uuid : null,
          guestUuidToUpdate: isNewPeriodGuest ? selectedUser.uuid : null,
        },
      )
      await deletePeriod(deleteSuscriptionSuscriptionDTO)
      setLoadingDelete(false)
    } catch (error) {
      setLoadingDelete(false)
      
    }
  }

  return (
    <>
     <AskModal
        isOpen={isDeleteSuscriptionModalVisible}
        handleClose={toggleDeletePeriodModal}
        handleOk={() => onDeletePeriod()}
        okText='Sure'
        cancelText='Cancel'

        title='Delete period'
        subtitle={`Are you sure you want to delete this period?`}
      />
      <Box width="100%">
        <Box display="flex" width="100%">
          <Box
            width="50%"
            style={{ borderRightColor: COLORS.gray_primary }}
            borderRight={2}
            pb={4}
            pr={2}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
            >
              <Box
                alignSelf="flex-start"
                mb={2}
                fontFamily="font3"
                className="ITCAvantGardeStdBkBold"
              >
                Avatar
              </Box>
              {currentImage ? (
                <Avatar
                  src={selectedUser.thumbnail}
                  alt="Remy Sharp"
                  className={classes.avatar}
                ></Avatar>
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  className={classes.avatar}
                >
                  <Spin />
                </Box>
              )}
            </Box>
            <Box pb={2} className="ITCAvantGardeStdBkBold" fontFamily="font3">
              Personal Information
            </Box>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid item xs={6} md={6} lg={6}>
                <CustomInputWithValidations
                  {...propsCustomInputErrors}
                  variant="outlined"
                  size="small"
                  disabled
                  defaultValue={selectedUser.name}
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <CustomInputWithValidations
                  {...propsCustomInputErrors}
                  variant="outlined"
                  size="small"
                  defaultValue={selectedUser.lastname}
                  disabled
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                />
              </Grid>
            </Grid>
            <Box width="100%" py={2}>
              <CustomInputWithValidations
                {...propsCustomInputErrors}
                variant="outlined"
                size="small"
                fullWidth
                defaultValue={selectedUser.name}
                disabled
                required
                id="company"
                name="company"
                label="Company"
              />
            </Box>
            <Box width="100%" pb={2}>
              <CustomInputWithValidations
                {...propsCustomInputErrors}
                fullWidth
                disabled
                variant="outlined"
                size="small"
                defaultValue={selectedUser.email}
                id="email"
                name="email"
                label="Email"
              />
            </Box>
          </Box>
          <Box width="50%" pl={2}>
            {type === USERS_TYPES.ADMIN && (
              <Box>
                <Box pb={2} fontFamily="font3">
                  Plan
                </Box>
                <Box width="100%" pb={2}>
                  <CustomInputWithValidations
                    {...propsCustomInputErrors}
                    fullWidth
                    size="small"
                    variant="outlined"
                    defaultValue={selectedUser.lastSuscription.invitations}
                    required
                    disabled
                    id="invitations"
                    name="invitations"
                    label="No. of invitations:"
                  />
                </Box>
              </Box>
            )}
            <Box fontFamily="font3" pb={2}>
              Period
            </Box>
            <Grid container spacing={2} justify="center" alignItems="center">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid item xs={6} md={6} lg={6}>
                  <KeyboardDatePicker
                    size="small"
                    fullWidth={true}
                    autoOk
                    contentEditable={false}
                    disabled
                    variant="inline"
                    inputVariant="outlined"
                    label="Start"
                    format="DD/MM/YYYY"
                    value={selectedUser.lastSuscription.startedAt}
                    InputAdornmentProps={{ position: 'start' }}
                    onChange={() => {}}
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <KeyboardDatePicker
                    disabled
                    fullWidth={true}
                    autoOk
                    variant="inline"
                    size="small"
                    inputVariant="outlined"
                    label="Finish"
                    format="DD/MM/YYYY"
                    value={selectedUser.lastSuscription.finishedAt}
                    InputAdornmentProps={{ position: 'start' }}
                    onChange={() => {}}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Box fontFamily="font3" pt={2} pb={2}>
              Total cost
            </Box>
            <Box display="flex" mb={2}>
              <Box width="50%">
                <CustomInputWithValidations
                  {...propsCustomInputErrors}
                  fullWidth
                  size="small"
                  variant="outlined"
                  disabled
                  defaultValue={selectedUser.lastSuscription.cost}
                  id="totalCost"
                  name="totalCost"
                  label="Total Cost"
                  InputProps={{
                    inputComponent: NumberFormatCustom as any,
                  }}
                />
              </Box>

              {!hasNewPeriod && !selectedUser.suscriptionWaiting && (
                <Box
                  width="50%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box className={classes.total}>
                    <Button
                      className="animate-fadein"
                      onClick={() => onClickNewPeriod()}
                      color="secondary"
                    >
                      Add Period +{' '}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
            {hasNewPeriod && children}
            {selectedUser.suscriptionWaiting && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Box mb={2} fontFamily="font3">
                      Siguiente periodo
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={6} direction="row">
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          size="small"
                          fullWidth
                          autoOk
                          contentEditable={false}
                          disabled
                          variant="inline"
                          inputVariant="outlined"
                          label="Start"
                          format="DD/MM/YYYY"
                          value={selectedUser.suscriptionWaiting.startedAt}
                          InputAdornmentProps={{ position: 'start' }}
                          onChange={() => {}}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          size="small"
                          fullWidth
                          autoOk
                          contentEditable={false}
                          disabled
                          variant="inline"
                          inputVariant="outlined"
                          label="Finish"
                          format="DD/MM/YYYY"
                          value={selectedUser.suscriptionWaiting.finishedAt}
                          InputAdornmentProps={{ position: 'start' }}
                          onChange={() => {}}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid   item xs={6}>
                      <CustomInputWithValidations
                        {...propsCustomInputErrors}
                        fullWidth
                        size="small"
                        variant="outlined"
                        disabled
                        defaultValue={selectedUser.suscriptionWaiting.cost}
                        id="totalCost"
                        name="totalCost"
                        label="Total Cost"
                      />
                    </Grid>
                    <Grid   item xs={6}>
                      <Box  display="flex" justifyContent="center">

                    <ButtonAnt
                      className="animate-fadein"
                      onClick={ toggleDeletePeriodModal}
                      type="text"
                      loading={loadingDelete}
                      style={{
                        color:COLORS.red_error,

                      }}
                      >
                      Delete period --
                    </ButtonAnt>
                      </Box>
                    </Grid>
                    <Grid item xs={12}></Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

const DataNewPeriod = ({
  typeToUpdate,
  setHasNewPeriod,
  handleClose,
  onClickNewPeriod,
}) => {
  const { selectedUser, addNewPeriod, loading } = useContext(UserContext)

  const [dataNewPeriod, setDataNewPeriod] = useState({
    invitations: null,
    finishedAt: '',
    startedAt: '',
    cost: null,
  })

  const onChangeInput = (e) => {
    setErrors(initialErrors())
    setDataNewPeriod({
      ...dataNewPeriod,
      [e.target.name]: e.target.value,
    })
  }
  const today = new Date()
  const [errors, setErrors] = useState(initialErrors())
  const [startedAt, setStartDate] = useState<string>(
    moment(today).toISOString(),
  )
  const [finishedAt, setFinishDate] = useState<string>(
    moment(today).toISOString(),
  )

  const handleDateStartChange = (e) => {
    setErrors(initialErrors())
    if (moment(e.format()).isAfter(finishedAt)) {
      setErrors({
        ...errors,
        startedAt: `La fecha debe ser anterior a la final.`,
      })
    } else {
      const newDate = new Date(e.format()).toISOString()
      setStartDate(newDate)
    }
  }
  const handleDateEndChange = (e) => {
    setErrors(initialErrors())
    if (moment(e.format()).isBefore(startedAt)) {
      setErrors({
        ...errors,
        finishedAt: `La fecha debe ser después al inicio.`,
      })
    } else {
      const newDate = new Date(e.format()).toISOString()

      setFinishDate(newDate)
    }
  }

  const validateCompany = (
    commondErrors: NewPeriodErrors,
  ): { isOk: boolean; errors: NewPeriodErrors } => {
    let isValid = true
    const newErrors: NewPeriodErrors = {
      ...commondErrors,
    }
    if (!dataNewPeriod.invitations) {
      newErrors.invitations = `Please fill this value`
      isValid = false
    } else if (dataNewPeriod.invitations <= MIN_INVITATIONS) {
      newErrors.invitations = `Enter a minimum of ${MIN_INVITATIONS} ${
        MIN_INVITATIONS === 1 ? 'invitation.' : 'invitations.'
      }`
      isValid = false
    } else if (dataNewPeriod.invitations > MAX_INVITATIONS) {
      newErrors.invitations = `You can only choose up to ${MAX_INVITATIONS} invitations.`
      isValid = false
    }
    if (!isValid) {
      setErrors(newErrors)
    }
    return {
      isOk: isValid,
      errors: newErrors,
    }
  }
  const isCommondFieldsValid = (): {
    isOk: boolean
    commondErrors: NewPeriodErrors
  } => {
    let newErrors: NewPeriodErrors = { ...errors }
    let isValid = true

    if (!moment(startedAt).isValid() || moment(startedAt).isAfter(finishedAt)) {
      newErrors.startedAt = `You must select a date`
      isValid = false
    }
    if (
      moment(startedAt).isBetween(
        selectedUser.lastSuscription.startedAt,
        selectedUser.lastSuscription.finishedAt,
      )
    ) {
      newErrors.startedAt = `The date cannot be overlapped with the previous subscription.`
      isValid = false
    }
    if (
      !moment(finishedAt).isValid() ||
      moment(finishedAt).isBefore(startedAt)
    ) {
      newErrors.finishedAt = `You must select a date`
      isValid = false
    }
    if (moment(finishedAt).isSame(startedAt)) {
      newErrors.finishedAt = `The dates must be different`
      newErrors.startedAt = `The dates must be different`
      isValid = false
    }
    if (!dataNewPeriod.cost) {
      newErrors.cost = `Please fill this value`
      isValid = false
    } else if (dataNewPeriod.cost <= 0) {
      newErrors.cost = `You cannot put this value`
      isValid = false
    }
    if (!isValid) {
      setErrors(newErrors)
    }
    return {
      isOk: isValid,
      commondErrors: newErrors,
    }
  }
  const handleSend = async (e) => {
    e.preventDefault()
    let commondsFieldsAreValid: boolean
    let particularFieldsAreValid: boolean

    const isNewPeriodAdmin = typeToUpdate === USERS_TYPES.ADMIN
    const isNewPeriodGuest = typeToUpdate === USERS_TYPES.GUEST

    if (isNewPeriodAdmin) {
      const { isOk, commondErrors } = isCommondFieldsValid()
      commondsFieldsAreValid = isOk
      const { isOk: isOkCompany, errors } = validateCompany(commondErrors)
      particularFieldsAreValid = isOkCompany
      setErrors(errors)
    }
    if (isNewPeriodGuest) {
      const { isOk, commondErrors } = isCommondFieldsValid()
      commondsFieldsAreValid = isOk
      particularFieldsAreValid = true
      setErrors(commondErrors)
    }

    if (particularFieldsAreValid && commondsFieldsAreValid) {
      const newPeriodDTO: AddNewSuscriptionSuscriptionDTO = new AddNewSuscriptionSuscriptionDTO(
        {
          ...dataNewPeriod,
          startedAt,
          finishedAt,
          typeToUpdate,
          adminUuidToUpdate: isNewPeriodAdmin ? selectedUser.uuid : null,
          guestUuidToUpdate: isNewPeriodGuest ? selectedUser.uuid : null,
        },
      )
      const status = await addNewPeriod(newPeriodDTO)
      if (status === 0) {
        setErrors(initialErrors())
        setHasNewPeriod(false)
        handleClose()
      }
    }
  }
  return (
    <>
      <Box fontFamily="font3" pb={2}>
        Plan
      </Box>
      {typeToUpdate === USERS_TYPES.ADMIN && (
        <Box>
          <CustomInputWithValidations
            {...propsCustomInputErrors}
            fullWidth
            variant="outlined"
            size="small"
            onChange={onChangeInput}
            helperText={errors.invitations}
            error={errors.invitations !== null}
            required
            id="invitations"
            name="invitations"
            type="number"
            label="Number of invitations:"
            value={dataNewPeriod.invitations}
          />
        </Box>
      )}
      <Box fontFamily="font3" py={2}>
        Period
      </Box>
      <Grid container spacing={2} className="animate-fadein">
        <Grid item xs={12} sm={12}>
          <Grid container spacing={3}>
            <Grid item sm={6} direction="row">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  {...propsCustomInputErrors}
                  disablePast
                  minDate={new Date(selectedUser.lastSuscription.finishedAt)}
                  maxDate={new Date('2025-01-01')}
                  disableToolbar
                  fullWidth
                  autoOk
                  variant="inline"
                  size="small"
                  inputVariant="outlined"
                  label="Start"
                  format="DD/MM/YYYY"
                  name="startedAt"
                  value={startedAt}
                  error={errors.startedAt !== null}
                  InputAdornmentProps={{ position: 'start' }}
                  onChange={handleDateStartChange}
                  helperText={errors.startedAt}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item sm={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  {...propsCustomInputErrors}
                  disablePast
                  minDate={new Date(selectedUser.lastSuscription.finishedAt)}
                  maxDate={new Date('2025-01-01')}
                  disableToolbar
                  contentEditable={false}
                  helperText={errors.finishedAt}
                  name="finishedAt"
                  fullWidth={true}
                  error={errors.finishedAt !== null}
                  autoOk
                  variant="inline"
                  size="small"
                  inputVariant="outlined"
                  label="Finish"
                  value={finishedAt}
                  format="DD/MM/YYYY"
                  InputAdornmentProps={{ position: 'start' }}
                  onChange={handleDateEndChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Box fontFamily="font3" pt={2} pb={2}>
            Total cost
          </Box>
          <Box width="48%">
            <CustomInputWithValidations
              {...propsCustomInputErrors}
              fullWidth
              variant="outlined"
              size="small"
              onChange={onChangeInput}
              name="cost"
              error={errors.cost !== null}
              helperText={errors.cost}
              value={dataNewPeriod.cost}
              label="Total Cost"
            />
          </Box>
        </Grid>
      </Grid>
      <Box
        mt={2}
        position="absolute"
        right={20}
        bottom={30}
        display="flex"
        justifyContent="space-around"
      >
        <ButtonAnt
          color="primary"
          style={{
            color: 'white',
            backgroundColor: COLORS.blue_primary,
            border: 'none',
            borderRadius: '4px',
            minHeight: '2.4rem',
            textTransform: 'capitalize',
            marginRight: '1rem',
            width: '12rem',
          }}
          type="primary"
          onClick={onClickNewPeriod}
        >
          Cancel
        </ButtonAnt>
        <ButtonAnt
          loading={loading}
          type="primary"
          color="secondary"
          style={{
            border: 'none',
            color: 'white',
            backgroundColor: COLORS.blue_secondary,
            borderRadius: '4px',
            boxShadow: '1px 1px 22px -10px rgba(0,0,0,0.75)',
            minHeight: '2.4rem',
            textTransform: 'capitalize',
            width: '12rem',
          }}
          onClick={handleSend}
        >
          Save
        </ButtonAnt>
      </Box>
    </>
  )
}

const initialErrors = (): NewPeriodErrors => {
  return {
    cost: null,
    invitations: null,
    finishedAt: null,
    startedAt: null,
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: theme.spacing(1, 0),
    },
    total: {
      fontWeight: 700,
    },
    title: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2, 4, 3),
    },
    avatar: {
      marginBottom: '1.8rem',
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  }),
)
export default UserDetailModal
