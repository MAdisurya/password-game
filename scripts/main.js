class AppManager
{
    static gameTeams = [];

    /**
     * Registers a PGTeam into the static AppManager.gameTeams array
     * @param {*} team - the PGTeam to register
     */
    static registerTeam(team)
    {
        this.gameTeams.push(team);
    }

    /**
     * Reverse merge sort method that takes in teams array,
     * applies divide and conquer algorithm, and returns the teams array
     * in descending order (largest first)
     * @param {*} teamsArray - an array of teams
     */
    static reverseMergeSortTeams(teamsArray)
    {
        if (teamsArray.length <= 1)
        {
            return teamsArray;
        }

        const middle = Math.floor(teamsArray.length / 2);

        const left = teamsArray.slice(0, middle);
        const right = teamsArray.slice(middle);

        return this.reverseMergeTeams(
            this.reverseMergeSortTeams(left), 
            this.reverseMergeSortTeams(right)
        );
    }

    /**
     * Reverse merge method that merges two team arrays
     * in descending order (largest first)
     * based on the teams points
     * @param {*} left - the left team array
     * @param {*} right - the right team array
     */
    static reverseMergeTeams(left, right)
    {
        var resultArray = [];
        var leftIndex = 0;
        var rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length)
        {
            if (left[leftIndex].data.points > right[rightIndex].data.points)
            {
                resultArray.push(left[leftIndex]);

                leftIndex += 1;
            }
            else
            {
                resultArray.push(right[rightIndex]);

                rightIndex += 1;
            }
        }

        // Need to concat becuase there will be one element
        // remaining from either left OR right arrays
        return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    }
}

class App extends React.Component
{
    render()
    {
        return (
            <section className="main-section">
                <section id="pg-menu" className="fade-transition fade-transition-show">
                    <h1 className="main-title">PASSWORD</h1>

                    <PGButton 
                        buttonName="Play" 
                        className="play-btn"
                        onClick={() => {
                            // Need to replace this with CSS / Less when implemented
                            document.getElementById('pg-menu')
                                .classList.remove("fade-transition-show");
                            document.getElementById('pg-team-setup')
                                .classList.add("fade-transition-show");
                        }} 
                    />
                    <PGButton buttonName="Rules" className="rules-btn" />
                    <PGButton buttonName="Credits" className="credits-btn" />
                </section>

                <section id="pg-team-setup" className="fade-transition">
                    <div className="team-one-setup-ctn">
                        <PGTeamSetup teamName="TEAM ONE" />
                    </div>
                    <div className="team-two-setup-ctn">
                        <PGTeamSetup teamName="TEAM TWO" />
                    </div>

                    <PGButton 
                        buttonName="Start" 
                        className="start-btn"
                        onClick = {() => {
                            document.getElementById('pg-team-setup')
                                .classList.remove("fade-transition-show");
                            document.getElementById('pg-game')
                                .classList.add("fade-transition-show");
                        }} 
                    />
                </section>

                <PGGame />
            </section>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('pg-app')
);

