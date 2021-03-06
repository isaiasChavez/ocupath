import { AxiosResponse } from 'axios'
import { tokenAuth } from './axios'
import jwt from 'jsonwebtoken'
import { Config, StatusFile } from '.'
export const verifyEmail = (email: string): boolean => {
  if (
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
  ) {
    return true
  } else {
    return false
  }
}
export const verifyToken = (
  token: string
): {
  status: boolean
  jwtDecoded: {
    usuario: {
      type: number
      uuid: string
    }
  }
} => {
  try {
    const jwtDecoded = jwt.verify(token, Config.JWT_SIGN)
    tokenAuth(token)
    return { status: true, jwtDecoded }
  } catch (error) {
    return { status: false, jwtDecoded: null }
  }
}
export const decifreToken = (
  token: string
): { status: boolean; jwtDecoded: any } => {
  try {
    const jwtDecoded = jwt.verify(token, Config.JWT_SIGN)
    return { status: true, jwtDecoded }
  } catch (error) {
    return { status: false, jwtDecoded: null }
  }
}

export const nameLengthValidator = (file: File) => {
  if (file.name.length > Config.MAX_LENGTH_NAME_SIZE) {
    return {
      code: 'name-too-large',
      message: `Name is larger than ${Config.MAX_LENGTH_NAME_SIZE} characters`
    }
  }
  return null
}

export const verifyPassword = (pass: string) => {
  if (pass.length >= 8) {
    let mayuscula = false
    let minuscula = false
    let numero = false
    let caracter_raro = false

    for (let i = 0; i < pass.length; i++) {
      if (pass.charCodeAt(i) >= 65 && pass.charCodeAt(i) <= 90) {
        mayuscula = true
      } else if (pass.charCodeAt(i) >= 97 && pass.charCodeAt(i) <= 122) {
        minuscula = true
      } else if (pass.charCodeAt(i) >= 48 && pass.charCodeAt(i) <= 57) {
        numero = true
      } else {
        caracter_raro = true
      }
    }
    if (
      mayuscula == true &&
      minuscula == true &&
      caracter_raro == true &&
      numero == true
    ) {
      return true
    }
  }
  return false
}

export const getStatus = (id: number): { name: string; color: string } => {
  if (id === 0) {
    return {
      name: 'ACTIVE',
      color: 'primary'
    }
  }
  if (id === 1) {
    return {
      name: 'INACTIVE',
      color: 'secondary'
    }
  }
  if (id === 2) {
    return {
      name: 'PAUSED',
      color: 'primary'
    }
  }
  if (id === 3) {
    return {
      name: 'EXPIRED',
      color: 'primary'
    }
  }
  return {
    name: 'NO VALID',
    color: 'primary'
  }
}

enum ErrorsFile {
  nameTooLarge = 'name-too-large',
  fileTooHeavy = 'file-too-heavy'
}

export const validateFile = (
  file: File,
  configuration: {
    maxSize?: number,
    maxLengthName?:number
  }
): StatusFile | null => {

  const statusFile: StatusFile = {
    code: null,
    message: ''
  }

  const weight: number = Math.floor(file.size / Config.MB_IN_BITS)
  console.log("CONFIGURACIN",{configuration,weight})

  if (configuration.maxLengthName && file.name.length > configuration.maxLengthName) {
    
    return {
      code: ErrorsFile.nameTooLarge,
      message: `Name is larger than ${configuration.maxLengthName} characters`
    }
  }
  if (configuration.maxSize && weight > configuration.maxSize) {
    console.log("CONFIGURACIN")
    return {
      code: ErrorsFile.fileTooHeavy,
      message: `The maximum allowed file weight is: ${configuration.maxSize}MB, your file has: ${weight}MB`
    }
  }
  if (statusFile.code) {
    return statusFile
  }
  return null
}

export const processError = (res: ErrorEvent): boolean => {
  return false
}

export const preventDefault = event => event.preventDefault()
