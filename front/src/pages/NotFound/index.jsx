import { Link } from 'react-router-dom';
import './index.css';
import { useEffect } from 'react';

function NotFound() {
    useEffect(() => {
        drawVisor();
        animate();
    }, []);

    function drawVisor() {
        const canvas = document.getElementById("visor");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(5, 45);
        ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);
        ctx.lineTo(55, 20);
        ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);
        ctx.lineTo(15, 10);
        ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
        ctx.lineTo(5, 45);

        ctx.fillStyle = "#2f3640";
        ctx.strokeStyle = "#f5f6fa";
        ctx.fill();
        ctx.stroke();
    }

    function animate() {
        const cordCanvas = document.getElementById("cord");
        if (!cordCanvas) return;
        const ctx = cordCanvas.getContext("2d");

        let y1 = 160, y2 = 100, y3 = 100;
        let y1Forward = true, y2Forward = false, y3Forward = true;

        function loop() {
            requestAnimationFrame(loop);
            ctx.clearRect(0, 0, cordCanvas.width, cordCanvas.height);

            ctx.beginPath();
            ctx.moveTo(130, 170);
            ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);

            ctx.strokeStyle = "white";
            ctx.lineWidth = 8;
            ctx.stroke();

            if (y1 === 100) y1Forward = true;
            if (y1 === 300) y1Forward = false;
            if (y2 === 100) y2Forward = true;
            if (y2 === 310) y2Forward = false;
            if (y3 === 100) y3Forward = true;
            if (y3 === 317) y3Forward = false;

            y1Forward ? y1++ : y1--;
            y2Forward ? y2++ : y2--;
            y3Forward ? y3++ : y3--;
        }

        loop();
    }

    return (
        <div className="Body_NotFoundPage">
            <div className="moon"></div><div className="moon__crater moon__crater1"></div><div className="moon__crater moon__crater2"></div><div className="moon__crater moon__crater3"></div><div className="star star1"></div><div className="star star2"></div><div className="star star3"></div><div className="star star4"></div><div className="star star5"></div><div className="error">
                <div className="error__title">404</div>
                <div className="error__subtitle">Hmmm...</div>
                <div className="error__description">Parece que um dos desenvolvedores dormiu no ponto</div>
                <Link to={"/login"} className="error__button error__button--active">Login</Link>
                <Link to={"/"} className="error__button">Home</Link>
            </div><div className="astronaut">
                <div className="astronaut__backpack"></div>
                <div className="astronaut__body"></div>
                <div className="astronaut__body__chest"></div>
                <div className="astronaut__arm-left1"></div>
                <div className="astronaut__arm-left2"></div>
                <div className="astronaut__arm-right1"></div>
                <div className="astronaut__arm-right2"></div>
                <div className="astronaut__arm-thumb-left"></div>
                <div className="astronaut__arm-thumb-right"></div>
                <div className="astronaut__leg-left"></div>
                <div className="astronaut__leg-right"></div>
                <div className="astronaut__foot-left"></div>
                <div className="astronaut__foot-right"></div>
                <div className="astronaut__wrist-left"></div>
                <div className="astronaut__wrist-right"></div>

                <div className="astronaut__cord">
                    <canvas id="cord" height="500px" width="500px"></canvas>
                </div>

                <div className="astronaut__head">
                    <canvas id="visor" width="60px" height="60px"></canvas>
                    <div className="astronaut__head-visor-flare1"></div>
                    <div className="astronaut__head-visor-flare2"></div>
                </div>
            </div>
        </div>
    );
} export default NotFound