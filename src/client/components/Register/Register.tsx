import * as React from "react";

//implement email validation if there's time


export default class Register extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: {
        first: "",
        last: ""
      },
      email: "",
      password: "",
      phone: null
    };
  }

    /*handleSubmit(e) {
      e.preventDefault();
      console.log(e.target[0].value);
      const name = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      /*if (e.target.value !== null) {
        const phone = e.target.value[3];
      }
     
    }
    */
    
    render() {
      return (
        <div>
          <h1>Register Here</h1>
            <form>
              <input
                type="text"
                placeholder="first name"
                name="first-name"
              />
              <input
                type="text"
                placeholder="last name"
                name="last-name"
              />
              <input
                type="text"
                placeholder="email"
                name="email"
              />
              <input
                type="text"
                placeholder="password"
                name="password"
              />
              <input
                type="text"
                placeholder="phone"
                name="phone"
              />
            </form>
        </div>
      );
    }

  }