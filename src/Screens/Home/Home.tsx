import { useEffect, useState } from "react";
import EachGame from "../../Components/EachGame/EachGame";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Home.module.css";
import Navbar from "../../Components/Navbar/Navbar";

const API = import.meta.env.VITE_API;

const getData = (setData: any, setLoader: any) => {
  fetch(`${API}/data`)
    .then((res) => {
      res.json().then((res) => {
        console.log(res);
        setData(res?.res);
      });
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      setLoader(false);
    });
};

function Home() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getData(setData, setLoader);
  }, []);

  return (
    <>
      <Box>Home</Box>
      <Box className={styles.parentBox}>
        <Navbar />

        <Box className={styles.itemsParent}>
          {loader ? (
            <Box className={styles.progressParent}>
              <CircularProgress />
            </Box>
          ) : data.length != 0 ? (
            data.map((el, i) => {
              return (
                <Box key={i}>
                  <EachGame game={el} />
                </Box>
              );
            })
          ) : (
            "No Data Found"
          )}
        </Box>
      </Box>
    </>
  );
}

export default Home;
