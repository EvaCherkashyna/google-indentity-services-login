import React, { useEffect, useState } from "react";
import style from "./App.module.scss";
import jwt_decode from "jwt-decode";
import { gapi } from "gapi-script";
interface resp {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}
interface userCred {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}
function App() {
  const [user, setUser] = useState<userCred | any>({});

  const handleCallbackResponse = (response: resp) => {
    console.log(response);
    var userCredential: userCred = jwt_decode(response.credential);
    console.log(userCredential);
    setUser(userCredential);
    //@ts-ignore
    document.getElementById("signInDiv").hidden = true;
  };
  useEffect(() => {
    /*global google*/
    //@ts-ignore
    google.accounts.id.initialize({
      client_id:
        "429774527765-87q4op7mslfa3oc8pjahrtp1s1j3o9u3.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    //@ts-ignore
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    //@ts-ignore
    google.accounts.id.prompt();
  }, []);
  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUser({});
    //@ts-ignore
    document.getElementById("signInDiv").hidden = false;
  };
  return (
    <div className={style.App}>
      <div id="signInDiv"></div>

      {Object.entries(user).length != 0 && (
        <div className={style.cont}>
          <div>
            <img src={user.picture} />
            <h3>{user.name}</h3>
          </div>
          <button onClick={(e) => handleSignOut(e)} className={style.signOut}>
            <img
              className={style.img}
              width="20px"
              src="https://img.icons8.com/color/512/google-logo.png"
              />
          <span style={{marginRight:"10px"}}>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
