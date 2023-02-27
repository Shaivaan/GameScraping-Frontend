import React, { useState } from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { TfiSearch } from "react-icons/tfi";
import style from "./Navbar.module.css";
import { CircularProgress } from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
const API = import.meta.env.VITE_API;
const debounceTime = 800;
let debouncer: any;

function Navbar() {
  const [searchData, setSearchData] = useState<any>([]);
  const [dataLoader, setDataLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const getSearchGames = (searchValue: any) => {
    fetch(`${API}/search/${searchValue}`)
      .then((res) => {
        res.json().then((res: any) => {
          setSearchData([...res.res.items]);
        });
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        setDataLoader(false);
      });
  };

  const deboucerFunction = (searchValue: any) => {
    setSearchValue(searchValue);

    if (searchValue.trim().length == 0) {
      clearInterval(debouncer);
      setDataLoader(false);
      setSearchData([]);
      return;
    }

    setDataLoader(true);
    debouncer && clearTimeout(debouncer);
    debouncer = setTimeout(() => {
      getSearchGames(searchValue);
    }, debounceTime);
  };


  return (
    <Box>
      <TextField
        onChange={(e: any) => {
          deboucerFunction(e.target.value);
        }}
        value={searchValue}
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <IconButton>
              <TfiSearch />
            </IconButton>
          ),
        }}
        fullWidth
      />
      <Box className={style.searchBox}>
        {dataLoader ? (
          <Box className={style.progress}>
            <CircularProgress />
          </Box>
        ) : (
          searchData.map((el: any, i: number) => {
            return (
              <EachOption key={i} changeValue={setSearchValue} item={el} />
            );
          })
        )}
      </Box>
    </Box>
  );
}

const EachOption = ({ item, changeValue }: any) => {
  const handleChange = () => {
    changeValue(item.text);
  };

  return (
    <>
      <Box className={style.item} onClick={handleChange}>
        <Box marginRight={"10px"}>
          <BiSearchAlt />
        </Box>
        {item.text}
      </Box>
    </>
  );
};

export default Navbar;
