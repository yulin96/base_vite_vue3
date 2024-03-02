export const theWindow = parent || window

export const isSmallMobile = theWindow.innerHeight < 700

export const prodModel = import.meta.env.PROD

export const devModel = import.meta.env.DEV
