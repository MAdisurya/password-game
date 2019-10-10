class PGGame extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            roundCounter: 0,
            password: "",
            currentTeamTurn: ""
        }
    }
}