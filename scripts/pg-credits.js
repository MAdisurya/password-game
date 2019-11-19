class PGCredits extends PGScene
{
    render()
    {
        return (
            <section id={this.props.sceneName} className="fade-transition">
                <div className="pg-credits-ctn">
                    <p>
                        "Password" is a game based on the 
                        American TV Show "Password".
                    </p>
                    <p>
                        App developed by Mario Adisurya.
                    </p>
                </div>
                <PGButton 
                        buttonName="Back To Menu"
                        className="pg-credits-back-btn"
                        onClick={() => {
                            PGSceneManager.goToScene("pg-menu");
                        }}
                    />
            </section>
        );
    }
}