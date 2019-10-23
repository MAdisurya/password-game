class PGGameOver extends React.Component
{
    render()
    {
        // TODO: Refactor to map the elements instead of hardcode

        return (
            <div className="pg-game-over-ctn">
                <div className="pg-game-over-team-ctn pg-winner-ctn">
                    <h2>1ST PLACE: {AppManager.gameTeams[0].data.teamName}</h2>
                    <h3>SCORE: {AppManager.gameTeams[0].data.points}</h3>
                </div>
                <div className="pg-game-over-team-ctn">
                    <h3>2ND PLACE: {AppManager.gameTeams[1].data.teamName}</h3>
                    <h3>SCORE: {AppManager.gameTeams[1].data.points}</h3>
                </div>
            </div>
        );
    }
}