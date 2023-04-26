import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {};

type FormValues = {
  login: string;
  password: string;
};

const Home = (props: Props) => {
  const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.login && data.password) {
      fetch("/api/users", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    }

    console.log(data);
  };

  const getData = async () => {
    const request = await fetch("/api/users");
    const data = await request.json();
    setData(data);
    console.log(data);
  };

  const noData = "text-red-500";

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="w-2/5 mx-auto">
          <h4 className="text-xl text-center">Get Data</h4>
          <p className={data.length ? "" : noData}>
            {data.length
              ? data.map(({ id, login, password }) => (
                  <li key={id}>
                    Login: {login} <br />
                    Password: {password}
                  </li>
                ))
              : "There is no data"}
          </p>
          <button
            onClick={() => getData()}
            className="bg-slate-400 w-full text-white font-semibold rounded-lg hover:bg-slate-300 transition-all"
          >
            Get Data
          </button>
        </div>

        {/** WRITE DATA */}
        <div className="w-2/5 mx-auto mt-10">
          <h4 className="text-xl text-center">Write data</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="w-full border-gray-500 border-2"
              placeholder="login"
              {...register("login", { required: true })}
            />
            {errors.login && (
              <p className="text-red-600">This field is required!</p>
            )}
            <input
              type="text"
              className="w-full border-gray-500 border-2 mt-2"
              placeholder="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-600">This field is required!</p>
            )}
            <button
              type="submit"
              className="bg-slate-400 w-full text-white font-semibold rounded-lg hover:bg-slate-300 transition-all mt-2"
            >
              Send Data
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
