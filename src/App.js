import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import "./App.css";
import QRCode from "qrcode";
import { useState, useRef } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import QrReader from 'react-qr-reader';

function App() {
  const [text, setText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const qrRef = useRef(null);
  const generateQRCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageURL(response);
    } catch (error) {
      console.log(error);
    }
  };
  const clearText = () => {
    setText("");
    setImageURL("");
  };

  const onScanFile=()=>{
    qrRef.current.openImageDialog();
  }

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
    }
  }

  return (
    <>
      <Container style={{ marginTop: "2%" }}>
        <Card>
          <Typography
            variant="h4"
            textAlign="center"
            style={{
              backgroundColor: "#3f51b5",
              color: "#fff",
              padding: "10px",
            }}
          >
            Generate Download & Scan QR Code
          </Typography>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <TextField
                  label="Enter Text Here"
                  value={text}
                  variant="standard"
                  onChange={(e) => setText(e.target.value)}
                />
                <ClearIcon onClick={() => clearText()} />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px", marginBottom: "20px" }}
                  onClick={() => generateQRCode()}
                >
                  Generate
                </Button>

                {imageURL && (
                  <>
                    <img src={imageURL} alt="img" />
                    <br />
                    <Button
                      size="small"
                      variant="outlined"
                      href={imageURL}
                      download
                    >
                      Download
                    </Button>
                  </>
                )}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Button variant="contained" color="secondary" onClick={onScanFile}>
                  Scan QR Code
                </Button>
                <QrReader
                  ref={qrRef}
                  delay={300}
                  style={{ width: "100%" }}
                  onError={handleErrorFile}
                  onScan={handleScanFile}
                  legacyMode
                />
                <Typography variant="h6">Scanned Code: {scanResultFile}</Typography>
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Typography variant="h6">Qr Code Scan by Web Cam</Typography>
                <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                         <Typography variant="h6">Scanned By WebCam Code: {scanResultWebCam}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default App;
