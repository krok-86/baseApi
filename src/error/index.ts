// export class CustomError extends Error {
//   public message: string
//   public status: number
 
//   constructor(message: string, status: number) {
//     super(message)
//     this.message = message
//     this.status = status
//   }
// }

export class CustomError extends Error {
  message: string
  status: number
    constructor(message: string, status: number) {
      super(message)
      this.message = message
      this.status = status
    }
  }

  // export default CustomError;
