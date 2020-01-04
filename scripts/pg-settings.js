class PGSettings extends PGScene
{
    constructor(props)
    {
        super(props);


    }

    render()
    {
        return (
            <section id={this.props.sceneName} className="fade-transition">
                <div className="header-ctn">
                    <h2>PASSWORD PACKS</h2>
                </div>

                <div className="pg-checkbox-ctn-outer">
                    <PGCheckbox 
                        buttonName="English Pack"
                        keyName="ENG"
                        checked={true} />
                    <PGCheckbox 
                        buttonName="Indonesia Pack"
                        keyName="INDO" />
                </div>

                <PGButton 
                    buttonName="Start"
                    className="start-btn"
                    onClick={() => {
                        PGSceneManager.goToScene("pg-game");
                    }} 
                />
            </section>
        );
    }
}