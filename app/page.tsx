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
  let imgsrc = "/V2_icons/large/png/" + weathercode + "_" + weatherstat + "_large.png";
  return <Image
        src={imgsrc}
        alt="WeatherCode"
        width={200}
        height={200}
        priority  
  />;
}

function SearchBar(){
  return (
    <div className="col-md-12 d-flex justify-content-center">
        <div className="col-md-1 m-2 mt-0 mb-0">
          <button style={{all: "unset", cursor: "pointer", textShadow: "0 0 15px #fff" }}>
              <Image
                src={"/icons/locationblack.png"}
                alt=""
                width={50}
                height={50}
                priority
              />
          </button>
        </div>
        <div className=" col-md-10 col-lg-6 m-2 mt-0 mb-0  rounded-5 d-flex align-items-center overflow-hidden">
          <input type="text" name="searchbar" className="bg-light w-100 h-100" style={{all: "unset", textShadow: "0 0 3px #00f" }}/>
          <button className="bg-warning " style={{all: "unset", cursor: "pointer"}}>
            <Image
              src={"/icons/search_cr23.svg"}
              alt=""
              width={50}
              height={50}
              priority
              />
          </button>
        </div>
    </div>
  );
}

function StatisCapsule({index, value}){
  let iconsrc = ["001-visibility.png", "002-wind-direction.png",
                  "003-temperature.png", "004-windy.png", "005-humidity.png",
                  "006-sunset.png", "007-sunrise.png", "008-rainy.png"];
  let imgsrc = "/Flaticon/png/" + iconsrc[index];
  return (
    <Col md={6} lg={12} xxl={6}>
      <Row className="g-1 mt-2 p-1 pt-3 pb-3 rounded bg-secondary align-items-center">
        <Col xs={6} className="d-flex align-items-center justify-content-evenly">
          <Image
            src={imgsrc}
            alt=""
            width={50}
            height={50}
            />
          <span className="">Visibility</span>
        </Col>
        <Col xs={6} className="text-center">
          <span className="">{value}</span>
        </Col>
      </Row>
    </Col>
  );
}

function PrimarycompTmp(){
  return(
    <Row className="box text-center p-4">
      <Col className="m-auto">
        <div className="d-flex justify-content-evenly m-auto">
            <Image
              src="/Flaticon/png/003-temperature.png"
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
  );
}

function PrimarycompSts(){
  return (
    <div className="pt-2 pb-3">
        <Row className="">
          <StatisCapsule index="1" value="15.6km"/>
          <StatisCapsule index="2" value="15.6km"/>
        </Row>
        <Row className="">
          <StatisCapsule index="3" value="15.6km"/>
          <StatisCapsule index="4" value="15.6km"/>
        </Row>
        <Row className="">
          <StatisCapsule index="5" value="15.6km"/>
          <StatisCapsule index="6" value="15.6km"/>
        </Row>
    </div>
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
      <Row className="mt-3 mb-2">
        <Col md={6} className="text-center">
          <h1 className={`${styles.cityname}`}>{city}</h1>
        </Col>
        <Col md={6} className="text-center">
          <SearchBar />
        </Col>
      </Row>
      <Row>
          <Col md={12} lg={6} className="mb-4">
              <PrimarycompTmp />
          </Col>
          <Col md={12} lg={6} className="m-auto">
              <PrimarycompSts />
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
        <div className={`${styles.square} card`}>

        </div>
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

