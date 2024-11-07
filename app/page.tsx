'use client'

import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { json } from "stream/consumers";


function Button({value}){
  return <button className={`${styles.buttonscomp2} mb-3 mt-3`}>{value}</button>;
}

function Imageicons({weathercode, weatherstat}){
  let imgsrc = "/V2_icons/large/png/" + weathercode + "_" + weatherstat + "_large@2x.png";
  return <Image
        src={imgsrc}   // Path relative to the "public" folder
        alt="WeatherCode"
        width={200}               // Set the desired width in pixels
        height={200}              // Set the desired height in pixels
        priority  
  />;
}

function PrimarycompTmp(){
  return(
    <>
    <Row className="box text-center p-4">
      <Col className="m-auto">
        <div className="d-flex justify-content-evenly m-auto">
            <Image
              src="/Flaticon/png/temperature.png"
              alt="Temperature"
              width={100}
              height={100}
              priority
            />
            <h1 className={styles.tempclass}>24°C</h1>
        </div>
        <div className="d-flex justify-content-center">
          <div className="m-2">Min: 18°C</div>
          <div className="m-2">Max: 28°C</div>
        </div>
        <div className="mt-2">
          <h1>Monday, Novomber 2.</h1>
          <h1>Updated as 11:35 AM</h1>
        </div>
      </Col>
      <Col className="m-auto">
        <Imageicons weathercode="10000" weatherstat="clear" />
        <h1 className={`${styles.cityname} col-md-12 mt-4`}>Clear</h1>
      </Col>
    </Row>
    </>
  );
}

function Primarycomp(){
  const [city, setCity] = useState<string>("");
  const tokenipinfo = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
  // Fetch city data
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await fetch(`https://ipinfo.io/json?token=${tokenipinfo}`); // Replace 'TOKEN' with your actual token
        if (!response.ok) {
          throw new Error('Failed to fetch city data');
        }
        const result = await response.json();
        setCity(result.city || "Unknown City");
      } catch (err) {
        console.error("Failed to fetch city data:", err);
      }
    };
    fetchCity();
  }, []);
  
  return (
    <div className={styles.primarycomp1}>
      <Row className="">
        <Col md={12} className="text-center">
          <h1 className={`${styles.cityname} col-md-6`}>{city}</h1>
        </Col>
      </Row>
      <Row>
          <Col md={12} lg={7} className="mb-4">
              <PrimarycompTmp />
          </Col>
          <Col md={12} lg={5} className="m-auto">
              <div className="box bg-secondary text-center p-4">
                  
              </div>
          </Col>
      </Row>
    </div>
  );
}

function Buttonscomp(){
  return (
    <div className="m-auto">
      <Button value="Hourly"/>
      <Button value="Daily"/>
    </div>
  );
}

function Seconderycomp(){
  return (
    <Row className={styles.seconderycomp1}>
      <Col md={6} lg={2} className={styles.buttonscomp1}>
        <Buttonscomp />
      </Col>
      <Col md={6} lg={2} className="mb-2 mt-2">
        <div className={`${styles.square} card`}></div>
      </Col>
      <Col md={6} lg={2} className="mb-2 mt-2">
        <div className={`${styles.square} card`}></div>
      </Col>
      <Col md={6} lg={2} className="mb-2 mt-2">
        <div className={`${styles.square} card`}></div>
      </Col>
      <Col md={6} lg={2} className="mb-2 mt-2">
        <div className={`${styles.square} card`}></div>
      </Col>
      <Col md={6} lg={2} className="mb-2 mt-2">
        <div className={`${styles.square} card`}></div>
      </Col>
    </Row>
  );
}


function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      setIsVisible(true); // Trigger animation on component mount
  }, []);

  return (
    <div className={isVisible ? `${styles.rise} ${styles.appcompzero}` : styles.appcompzero}>
        <Primarycomp />
        <Seconderycomp />
    </div>
  );
}

export default Home;
