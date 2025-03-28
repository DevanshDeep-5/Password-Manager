import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

// Database version (MongoDB)
  const getPassword = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setpasswordArray(passwords)
  }
  

  useEffect(() => {
    getPassword()  // Database version (MongoDB)

    // Local Storage version

    // let pass = localStorage.getItem("passwords");
    // if (pass) {
    //   setpasswordArray(JSON.parse(pass));
    // }
  }, []);

  const showPassword = () => {
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/cross-eye.svg")) {
      ref.current.src = "icons/eye.svg";
      passwordref.current.type = "password";
    } else {
      ref.current.src = "icons/cross-eye.svg";
      passwordref.current.type = "text";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {

      // if any such ID exists in db, delete it
      await fetch("http://localhost:3000/", { method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: form.id})})


      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

      // Database version (MongoDB)
      let res = await fetch("http://localhost:3000/", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ ...form, id: uuidv4() })})

      // Local Storage version

      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      // console.log([...passwordArray, form]);

      setform({ site: "", username: "", password: "" });
      toast("Password saved!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Error: Password not saved");
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copytext = (text) => {
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const deletepassword = async (id) => {
    console.log("Deleting the password with id", id);
    let c = confirm("Do you really want to Delete this Password");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id != id));

      // Database version (MongoDB)
      let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id})})

      // Local Storage version

      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id != id))
      // );
      toast("Password deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editpassword = (id) => {
    console.log("Editing the password with id", id);
    setform({...passwordArray.filter((item) => item.id === id)[0], id: id});
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50  bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3 md:p-0 md:mycontainer min-h-[88.2vh]">
        <h1 className="font-bold text-4xl text-center">
          <span className="text-green-500">&lt;</span>
          Pass<span className="text-green-500">OP/ &gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center ">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row gap-8 w-full justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                ref={passwordref}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.svg"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 hover:bg-green-300 w-fit border-2 border-green-900 rounded-full gap-2 px-8 py-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to Show</div>}
          {passwordArray.length != 0 && (
            <table class="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center w-32 relative">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>{" "}
                        <img
                          onClick={() => {
                            copytext(item.site);
                          }}
                          className="absolute right-2 top-2 cursor-pointer"
                          src="icons/copy.svg"
                          alt=""
                        />
                      </td>
                      <td className="py-2 border border-white text-center w-32 relative">
                        {item.username}{" "}
                        <img
                          onClick={() => {
                            copytext(item.username);
                          }}
                          className="absolute right-2 top-2 cursor-pointer"
                          src="icons/copy.svg"
                          alt=""
                        />{" "}
                      </td>
                      <td className="py-2 border border-white text-center w-32 relative">
                        {"*".repeat(item.password.length)}{" "}
                        <img
                          onClick={() => {
                            copytext(item.password);
                          }}
                          className="absolute right-2 top-2 cursor-pointer"
                          src="icons/copy.svg"
                          alt=""
                        />
                      </td>
                      <td className="py-2 border border-white text-center w-32 relative ">
                        <span
                          className=" cursor-pointer mx-1"
                          onClick={() => {
                            editpassword(item.id);
                          }}
                        >
                          {" "}
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            style={{ width: "27px", height: "27px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletepassword(item.id);
                          }}
                        >
                          {" "}
                          <lord-icon
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="hover"
                            style={{ width: "27px", height: "27px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          ​
        </div>
      </div>
    </>
  );
};

export default Manager;
 