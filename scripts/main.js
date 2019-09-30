class App extends React.Component
{
    render()
    {
        return (
            <section className="main-section">
                <section id="pg-menu">
                    <h1 className="main-title">PASSWORD</h1>

                    <PGButton buttonName="Play" className="play-btn" />
                    <PGButton buttonName="Rules" className="rules-btn" />
                    <PGButton buttonName="Credits" className="credits-btn" />
                </section>

                <section id="pg-team-setup">
                    <div className="team-one-setup-ctn">
                        <PGTeamSetup teamName="TEAM ONE" />
                    </div>
                    <div className="team-two-setup-ctn">
                        <PGTeamSetup teamName="TEAM TWO" />
                    </div>
                </section>
            </section>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('pg-app')
);

