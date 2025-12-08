const BackgroundSpline = ({className}:{className?: string}) => {
    return (
        <svg className={`bgSpline ${className ? className : ''}`} viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M-102.5 352C-12.1667 297.333 181.5 204.4 233.5 270C298.5 352 411 969.5 665 543.5C919 117.5 969.5 -325.5 1697.5 -173" stroke="white" strokeWidth="4"/>
<path d="M-281 1079C37 935.833 592.6 748.6 271 1145C-131 1640.5 525 821 920.5 1109C1316 1397 1380.5 545.5 1778 1109C2096 1559.8 2122.17 837.167 2095.5 419.5C1855.83 506 1442.4 598.3 1706 275.5C1969.6 -47.3 1333.5 -59 982.5 -24.5" stroke="white" strokeWidth="4"/>
</svg>
    )
}

export default BackgroundSpline