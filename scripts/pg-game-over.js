class PGGameOver extends React.Component
{
    render()
    {
        return (
            <div className="pg-game-over-ctn">
                {AppManager.gameTeams.map((team, index) => (
                    <div key={team.data.teamName} className="pg-game-over-team-ctn pg-winner-ctn">
                        <h2>{index + 1} - {team.data.teamName}</h2>
                        <h3>SCORE: {team.data.points}</h3>
                    </div>
                ))}
            </div>
        );
    }
}