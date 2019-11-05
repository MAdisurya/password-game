class PGSceneManager
{
    static scenes = {};

    // The current scene being displayed
    static currentScene = undefined;
    // The previous scene that was displayed
    static previousScene = undefined;

    /**
     * Registers a scene into SceneManager.scenes dictionary
     * @param {*} scene - (PGScene) the scene to register
     */
    static registerScene(scene)
    {
        this.scenes[scene.props.sceneName] = scene;
    }

    /**
     * Goes to the scene with the specified scene name
     * @param {*} sceneName - (String) The name of the scene
     */
    static goToScene(sceneName)
    {
        try
        {
            if (this.currentScene == undefined)
            {
                this.currentScene = this.scenes["pg-menu"];
            }
            
            if (this.currentScene != undefined)
            {
                this.previousScene = this.currentScene;
                this.previousScene.hideScene();
            }

            this.currentScene = this.scenes[sceneName];
            this.currentScene.sceneDidLoad();
            this.currentScene.showScene();
        }
        catch (err)
        {
            console.log("goToScene(): Scene with passed sceneName does not exist.");
            console.log(`goToScene(): ${err}`);
        }
    }
}

class PGScene extends React.Component
{
    constructor(props)
    {
        super(props);

        // Register this scene into the Scene Manager
        PGSceneManager.registerScene(this);
    }

    /**
     * Lifecycle method that's called after the Scene Manager loads this scene
     */
    sceneDidLoad()
    {
        if (this.props.sceneName == undefined)
        {
            throw "Trying to load scene, but scene does not have a scene name!";
        }

        console.log(`Scene: ${this.props.sceneName} loaded.`);
    }

    /**
     * Hides this scene
     */
    hideScene()
    {
        document.getElementById(this.props.sceneName)
            .classList.remove("fade-transition-show");
    }

    /**
     * Shows this scene
     */
    showScene()
    {
        document.getElementById(this.props.sceneName)
            .classList.add("fade-transition-show");
    }
}