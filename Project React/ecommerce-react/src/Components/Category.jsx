import React, { useState } from "react";
import { Container, Row, Col, CardGroup, CardImg, Card, CardBody, CardTitle, Button, CardText } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Category = (props) => {

    return (


        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4 text-center">
                    <CardBody>
                        <img src="https://www.udiscovermusic.com/wp-content/uploads/2021/01/TheBeat_SgtPepp_CoverAr_3000DPI300RGB1000135017.jpg" alt="" width={"200px"} className="rounded-circle" />
                        <h3>
                            Category
                        </h3>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        </p>
                        <Button>
                            View details
                        </Button>
                    </CardBody>
                </div>
                <div className="col-12 col-md-4 text-center">
                    <CardBody>
                        <img src="https://www.udiscovermusic.com/wp-content/uploads/2021/01/TheBeat_SgtPepp_CoverAr_3000DPI300RGB1000135017.jpg" alt="" width={"200px"} className="rounded-circle" />
                        <h3>
                            Category
                        </h3>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        </p>
                        <Button>
                            View details
                        </Button>
                    </CardBody>
                </div>
                <div className="col-12 col-md-4 text-center">
                    <CardBody>
                        <img src="https://www.udiscovermusic.com/wp-content/uploads/2021/01/TheBeat_SgtPepp_CoverAr_3000DPI300RGB1000135017.jpg" alt="" width={"200px"} className="rounded-circle" />
                        <h3>
                            Category
                        </h3>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        </p>
                        <Button>
                            View details
                        </Button>
                    </CardBody>
                </div>
            </div>
        </div>



    )
}

export default Category