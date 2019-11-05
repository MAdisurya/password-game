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

    /**
     * Change the current color palette of the app
     * @param {*} color - (string) the color palette to change to e.g. "p1", "p2"
     */
    static changeColorScheme(color)
    {
        // App
        document.getElementById("pg-app").className = "";
        document.getElementById("pg-app").classList.add(color);
    }

    /**
     * Change current color scheme back to default
     */
    static defaultColorScheme()
    {
        // App
        document.getElementById("pg-app").className = "";
    }
}

class App extends React.Component
{
    render()
    {
        return (
            <section className="main-section">
                <PGMenu 
                    sceneName="pg-menu"
                />

                <PGTeamSetupScene 
                    sceneName="pg-team-setup"
                />

                <PGGame 
                    sceneName="pg-game"
                />

                <PGGameOver
                    sceneName="pg-game-over"
                />
            </section>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('pg-app')
);

