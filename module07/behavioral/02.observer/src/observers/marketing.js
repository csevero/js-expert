export default class Marketing {
  update({ id, username }) {
    //important, the update method is responsible to handle with errors/exceptions
    //the notify method should not use await, because it responses is just trigger events
    console.log(`${id}: [marketing] will send a welcome email to ${username}`)

  }
}