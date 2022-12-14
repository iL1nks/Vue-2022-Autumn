<template>
    <div id="app" class="app">
        <div class="content">
            <h1>Donation To Intelli Sci</h1>
            <p>
                If you like Intelli Sci, show your support with a donation.<br>
                Every little matters.
            </p>
        </div>
        <div class="buttons">
            <button @click="alipayClick">Alipay</button>
            <button @click="wechatClick">WeChat</button>
        </div>
        <div class="parallax qrcode-imgs">
            <div class="parallax-top-left parallax-dir"></div>
            <div class="parallax-top-right parallax-dir"></div>
            <div class="parallax-bottom-left parallax-dir"></div>
            <div class="parallax-bottom-right parallax-dir"></div>
            <div class="parallax-content">
                <div class="blur"></div>
                <div class="parallax-back">
                    <img class="back-img" alt="" :src="img"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import desktop from '../assets/Make-a-Donation.png'
    import alipayQR from '../assets/alipayQR.jpg'
    import wechatQR from '../assets/wechatQR.jpg'

    export default {
        name: 'app',
        data() {
            return {
                img: desktop
            }
        },
        computed: {
            paypal() {
                return this.img === desktop
            }
        },
        methods: {
            alipayClick() {
                this.img = alipayQR
            },
            wechatClick() {
                this.img = wechatQR
            }
        }
    }
</script>

<style>
    html, body, .app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .app {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 60%;
        margin-left: 700px;
        margin-top: 20px;
    }

    .qrcode-imgs {
        margin-top: 4vh;
    }

    .back-img {
        display: block;
        width: 30vw;
        height: 30vw;
    }

    .blur {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.1);
    }

    .content {
        width: 100%;
        text-align: left;
    }

    h1, h3 {
        margin: 0;
        font-family: Impact, Charcoal, sans-serif;
        font-size: 40px;
        letter-spacing: 2px;
        text-transform: uppercase;
    }

    h2 {
        font-size: 12px;
    }

    p {
        max-width: 450px;
        font-weight: lighter;
        font-size: 16px;
        margin-bottom: 8vh;
    }

    .buttons {
        display: flex;
        border: 3px solid #000;
        border-right: 0;
        margin-bottom: 2vh;
    }

    button {
        flex: 1;
        border: 0;
        border-radius: 0;
        box-sizing: border-box;
        border-right: 3px solid #000;
        margin: 0;
        padding: 10px 85px;
        background-color: transparent;
        color: #000;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        font-weight: bold;
        outline: none;
        cursor: pointer;
        transition: .5s;
    }
    button:hover {
        background-color: #000;
        color: #fff;
    }

    footer {
        margin-top: 6vh;
    }

    ul {
        padding: 0;
        text-align: left;
    }
    li {
        list-style: none;
        display: inline-block;
        margin: 0 5px;
    }
    li a {
        color: #aaa;
        font-weight: lighter;
        text-decoration: none;
    }


    .parallax {
        display: block;
        height: auto;
        position: relative;
        width: auto;
    }
    .parallax:first-child {
        margin-right: 10vw;
    }


    .parallax-content {
        height: auto;
        transform: perspective(100rem);
        transform-style: preserve-3d;
        transition: all .4s ease;
        width: 100%;
        box-shadow: 0 2rem 4rem rgba(0, 0, 0, .45);
    }
    .parallax-content:before {
        content: "";
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }


    .parallax-front {
        align-items: center;
        color: #fff;
        display: flex;
        height: 100%;
        justify-content: center;
        left: 0;
        position: absolute;
        text-align: center;
        top: 0;
        transform: translateZ(10rem);
        transition: all .4s ease;
        width: 100%;
        z-index: 0;
        text-shadow: 5px 5px 2px #000;
    }

    .parallax-top-left {
        left: 0;
        top: 0;
    }
    .parallax-top-left:hover ~ .parallax-content {
        transform: perspective(100rem) rotateX(-3deg) rotateY(3deg);
    }
    .parallax-top-left:hover ~ .parallax-content:before {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 50%);
    }
    .parallax-top-left:hover ~ .parallax-content .parallax-front {
        transform: translate3d(-0.65rem, -0.65rem, 10rem);
    }


    .parallax-top-right {
        right: 0;
        top: 0;
    }
    .parallax-top-right:hover ~ .parallax-content {
        transform: perspective(100rem) rotateX(-3deg) rotateY(-3deg);
    }
    .parallax-top-right:hover ~ .parallax-content:before {
        background: linear-gradient(-135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 50%);
    }
    .parallax-top-right:hover ~ .parallax-content .parallax-front {
        transform: translate3d(0.65rem, -0.65rem, 10rem);
    }


    .parallax-bottom-left {
        bottom: 0;
        left: 0;
    }
    .parallax-bottom-left:hover ~ .parallax-content {
        transform: perspective(100rem) rotateX(3deg) rotateY(3deg);
    }
    .parallax-bottom-left:hover ~ .parallax-content:before {
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 50%);
    }
    .parallax-bottom-left:hover ~ .parallax-content .parallax-front {
        transform: translate3d(-0.65rem, 0.65rem, 10rem);
    }


    .parallax-bottom-right {
        bottom: 0;
        right: 0;
    }
    .parallax-bottom-right:hover ~ .parallax-content {
        transform: perspective(100rem) rotateX(3deg) rotateY(-3deg);
    }
    .parallax-bottom-right:hover ~ .parallax-content:before {
        background: linear-gradient(-45deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 50%);
    }
    .parallax-bottom-right:hover ~ .parallax-content .parallax-front {
        transform: translate3d(0.65rem, 0.65rem, 10rem);
    }


    .parallax-dir {
        height: 50%;
        position: absolute;
        width: 50%;
        z-index: 1;
    }




    @media (min-width: 768px) {
        .back-img {
            width: 25vw;
            height: 25vw;
        }
        button {
            font-size: 18px;
        }
        h2 {
            font-size: 14px;
        }
    }
    @media (max-width: 500px) {
        .back-img {
            width: 40vw;
            height: 40vw;
        }
        button {
            padding: 8px 15px;
        }
        h2 {
            font-size: 10px;
        }
    }
    @media (max-width: 500px) {
        button {
            padding: 8px 10px;
        }
    }
</style>
