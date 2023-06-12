
export const checkMissingInputFields = (missingFields: string[]): string | undefined => {
    if(missingFields.length === 1) {
        if(missingFields.join() === "email") {
            return "You did not enter your email!"
        } else if(missingFields.join() === "password") {
            return "You did not enter a password!"
        } else if(missingFields.join() === "confirmedPassword"){
            return "Your password is not confirmed!"
        }
    } else {
      return "Oups! Some fields are empty, try again!"  
    }
}