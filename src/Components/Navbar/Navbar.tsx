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
  const [isErase,setIsErase] = useState(false);

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

  const deboucerFunction = (e:any) => {
    if(e.keyCode == 8 && isErase){
      cancelSearchihng();
      return
    }
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim().length == 0) {
      setIsErase(false);
      clearInterval(debouncer);
      setDataLoader(false);
      setSearchData([]);
      return;
    }

    setDataLoader(true);
    debouncer && clearTimeout(debouncer);
    debouncer = setTimeout(() => {
      getSearchGames(value);
    }, debounceTime);
  };


   const cancelSearchihng=()=>{
      setSearchValue("");
      setIsErase(false);
      clearInterval(debouncer);
      setDataLoader(false);
      setSearchData([]);
   }


  return (
    <Box>
      <TextField
        onChange={(e:any)=>{setSearchValue(e.target.value)}}
        onKeyUp={deboucerFunction}
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

      
      <Box >
        {dataLoader ? (
          <Box className={`${style.progress} ${style.searchBox}`}>
            <CircularProgress />
          </Box>
        ) : (
          <Box className={searchData.length !=0 ? style.searchBox : ""}>
          {searchData.map((el: any, i: number) => {
            return (
              <EachOption key={i} changeValue={setSearchValue} item={el} eraser={setIsErase}/>
            );
          })}
          </Box>
        )}
      </Box>
    </Box>
  );
}

const EachOption = ({ item, changeValue,eraser }: any) => {
  const handleChange = () => {
    eraser(true);
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
