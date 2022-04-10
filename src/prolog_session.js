class PrologSession {

    session = pl.create(100000);
      
    /**
     * Create a new instance.
     * @param {function(string)} write - Output stream callback
     */
    constructor () {
  
      // response initialisation
      this.response = ''
  
      // Read prolog programs
      this.session.consult(TBOT)
        
      // Set default output
      this.session.set_current_output(new pl.type.Stream(
        {
          put (text, _) {
            this.response += text
            return true
          },
          flush: () => true
        },
        'write', 'html_output', 'text', false, 'eof_code'
      ))
  
    }
  
    /**
     * Query the prolog database.
     * @param {String} code - Prolog code to answer
     * @return {Promise<Object|false|null>} - Answer (see tau-prolog)
     */
    query (code) {
      console.log(`?- ${code}`)
      this.session.query(code)
      this.session.answer(rep => {
      console.log(pl.format_answer(rep))
      })
        this.response = pl.format_answer(rep)
    }


    /** reset the response to an empty string
     */
    reset_response() {
       this.response = ''
    }


    /**
     * TO COMPLETE
     * @returns {string}
     */
    get_response() {
       console.log("Essai de retour de response")
       console.log(this.response)
       return this.response }
      
  }
