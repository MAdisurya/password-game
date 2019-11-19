class PGMenu extends PGScene
{
    componentDidLoad()
    {
        PGSceneManager.currentScene = this;
    }

    render()
    {
        return (
            <section id={this.props.sceneName} className="fade-transition fade-transition-show">
                <h1 className="main-title">PASSWORD</h1>

                <PGButton 
                    buttonName="Play" 
                    className="play-btn"
                    onClick={() => {
                        PGSceneManager.goToScene("pg-team-setup");
                    }} 
                />
                <PGButton 
                    buttonName="Rules" 
                    className="rules-btn"
                    onClick={() => {
                        window.location.href = "https://www.thegamegal.com/2017/11/10/password/";
                    }} 
                />
                <PGButton 
                    buttonName="Credits" 
                    className="credits-btn"
                    onClick={() => {
                        PGSceneManager.goToScene("pg-credits");
                    }}
                />
            </section>
        );
    }
}