import "./style.css"

export default function Cancel({ color, width = "40px" }) {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke-width="4" stroke={color} width={width} fill="none"><line x1="8.06" y1="8.06" x2="55.41" y2="55.94" /><line x1="55.94" y1="8.06" x2="8.59" y2="55.94" /></svg>
}