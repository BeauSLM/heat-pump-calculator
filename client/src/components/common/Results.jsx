import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Modal, Box, Typography } from "@mui/material";
import "./Results.css";
import axios from "axios";
import Papa from "papaparse";

function Results() {

  const Results = {
    "Gas Heating": {
      desc: "with air conditioning",
      cost: "$1,181",
      breakdown: ["$656", "$28", "$1620"],
    },
    Testing: {
      desc: "with air conditioning",
      cost: "$1,181",
      breakdown: ["$656", "$28", "$1620"],
    },
    Testing2: {
      desc: "with air conditioning",
      cost: "$1,181",
      breakdown: ["$656", "$28", "$1620"],
    },
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [resultsData, setResultsData] = useState({});

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const sizeOfHome = parseInt(queryParams.get('sizeOfHome'));
        const buildYear = queryParams.get('buildYear');
        const existingFurnaceEfficiency = parseFloat(queryParams.get('existingFurnaceEfficiency')) / 100;

        console.log(sizeOfHome, buildYear, existingFurnaceEfficiency)
        const inputs = {
          buildYear,
          sizeOfHome,
          existingFurnaceEfficiency,
          heatPumpSelector: "Unit 1",
        };

        console.log(inputs)

        const response = await axios.post(
          "http://localhost:3001/api/calc",
          inputs
        );
        const parsed = Papa.parse(response.data);
        setResultsData(parsed);
        console.log(parsed)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location.search]);

  const handleOpenModal = (result) => {
    setSelectedResult(result);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="results-page">
      <div className="header">
        <div className="results-title">Full Heat Pump Comparison</div>
        <div className="description">
          Based on our research, a{" "}
          <span className="bold">standard heat pump with electric backup</span>{" "}
          is the lowest-cost solution for{" "}
          <span className="bold">a single house</span> heating and cooling in{" "}
          <span className="bold">Calgary</span> built in{" "}
          <span className="bold">1968</span>.
        </div>
      </div>
      <div className="comparisons">
        {Object.keys(Results).map((val, index) => (
          <div className="results-card" key={index}>
            <div className="results-card-content">
              <div className="content-title">{val}</div>
              <div className="content-desc">{Results[val].desc}</div>
              <div className="content-cost">
                <div className="cost-desc">Average annual cost</div>
                <div className="cost-amt">{Results[val].cost}</div>
              </div>
              <div className="cost-breakdown">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: ".5rem",
                  }}
                >
                  <span className="cost-breakdown-title">Cost breakdown</span>
                  {Results[val].breakdown.map((item, i) => (
                    <span className="cost-breakdown-span" key={i}>
                      <span
                        className="money-value-title"
                        style={{
                          width: `${
                            parseInt(item.replace("$", "").replace(",", "")) /
                            20
                          }px`,
                          backgroundColor:
                            parseInt(item.replace("$", "").replace(",", "")) <
                            1000
                              ? "#ccffcc"
                              : "#ffcccc",
                          overflow: "visible",
                          whiteSpace: "nowrap",
                          display: "inline-block",
                        }}
                      >
                        {i === 0
                          ? "Equipment after rebates"
                          : i === 1
                          ? "Electricity"
                          : "Other fees"}
                      </span>
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant="outlined"
                onClick={() => handleOpenModal(val)}
                sx={{
                  marginTop: "4rem",
                  borderRadius: "20px",
                  backgroundColor: "blue",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "900",
                  padding: ".5rem",
                }}
              >
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Button
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            Close
          </Button>
          <Typography variant="h6" component="h2">
            {selectedResult}
          </Typography>
          <Typography variant="body1" component="div">
            Description: {Results[selectedResult]?.desc}
          </Typography>
          <Typography variant="body1" component="div">
            Cost: {Results[selectedResult]?.cost}
          </Typography>
          <Typography variant="body1" component="div">
            Breakdown:
            <ul>
              {Results[selectedResult]?.breakdown.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Results;
