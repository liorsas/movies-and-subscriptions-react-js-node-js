import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  autoComp: {
    background: "white",
    border: 0,
    borderRadius: 4,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    width: 450,
    float: "right",
    margin: "10px",
  },
  movieCard: {
    background: "#E0E8F8",
  },
  memberMoviesCard: {
    border: "3px solid gray",
  },
});
export { useStyles };
