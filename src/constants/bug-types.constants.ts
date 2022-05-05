import Beetle from "../bugs/beetle";
import Ant from "../bugs/ant";
import Spider from "../bugs/spider";

export const bugTypes = [
    {name: 'beetle', type: Beetle, frameSize: {frameHeight: 48, frameWidth: 38} },
    {name: 'ant', type: Ant, frameSize: {frameHeight: 32, frameWidth: 32} },
    {name: 'spider', type: Spider,frameSize: {frameHeight: 64, frameWidth: 64} },
]
