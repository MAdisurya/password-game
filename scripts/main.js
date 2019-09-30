class App extends React.Component
{
    render()
    {
        return (
            <section class="main-section">
                <section id="pg-menu">
                    <h1 class="main-title">PASSWORD</h1>

                    <PGButton buttonName="Play" className="play-btn" />
                    <PGButton buttonName="Rules" className="rules-btn" />
                    <PGButton buttonName="Credits" className="credits-btn" />
                </section>

                <section id="pg-team-setup">
                    <div class="team-one-setup-ctn">
                        <PGTeamSetup teamName="TEAM ONE" />
                    </div>
                    <div class="team-two-setup-ctn">
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

