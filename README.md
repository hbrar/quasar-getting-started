# quasar-getting-started
Getting started with Yarn, Babel, Webpack, Vue and Quasar.

Root/Working Directory -> quasar-getting-started

##YARN

1.	Installing yarn using NPM in root directory
    
    `npm install yarn`
    
    Expect:
        a.	Folder "quasar-getting-started/node_modules/yarn" gets created
        b.	File "quasar-getting-started/package-lock.json" gets created

2.	Create a folder quasar-getting-started/myapp 
    
    `mkdir myapp`
    `cd myapp`

3.	Initialize folder with yarn
    
    `yarn -y init`
    
    Expect:
        a.	You see quasar-getting-started/myapp/package.json file with default values.
            
            ```
                {
                  "name": "myapp",
                  "version": "1.0.0",
                  "main": "index.js",
                  "license": "MIT"
                }
            ```
 
Root/Working Directory -> myapp


#WEBPACK


1.	Install webpack.

    `yarn add --dev webpack webpack-cli webpack-dev-server`
        
    Expect:
        a.	You will see webpack & all dependencies installed under myapp/node_modules(they are a lot!)
        b.	 Below code gets added to myapp/package.json:
        
               ```
               "devDependencies": {
                "webpack": "^4.29.6",
                "webpack-cli": "^3.3.0",
                "webpack-dev-server": "^3.2.1"
                }
                ```
    
2.	Add below script to myapp/package.json. 
        
        ```
        "scripts": {
                "dev": "webpack-dev-server --mode development --progress --hot --open",
                "build": "webpack --mode production --progress"
                }
        ```
         
    Expect:
        a.  You can now run webpack scripts from yarn e.g. `yarn dev` or `yarn build`. The command won't run yet since we have not defined an entry point which is myapp/dist/main.js by default.

3.  Create below directory structure.
        myapp/dist
        myapp/src
        myapp/src/index.js

4.  Add below code to index.js
        
        `console.log("Hello ME!")`
        
5.  To verify webpack is configured properly. Run `yarn build` command and you'll see a file called "main.js" gets created in myapp/dist/main.js
    
6.  Further verify that command `node dist/main.js` outputs "Hello ME!"


#BABEL


1.  Install Babel.
    
    `yarn add --dev @babel/core @babel/preset-env`
    
    Expect: 
	    a. Folder "myapp/node_modules/@babel" gets created
    
		b. Below code gets added to myapp/package.json
		
    		 ```
    		 "devDependencies": {
    			"@babel/core": "^7.3.4",
    			"@babel/preset-env": "^7.3.4"
    			}
    		```

2. To verify Babel is working.

        a. Install @babel/cli as dev dependencies and later remove since Webpack will be taking care of it going forward.
		
            `yarn add --dev @babel/cli`
		
            Expect:
        		a. You should see @babel/cli under node_modules 
                b. @babel/cli gets added as dev dependency in myapp/package.json
		
        b.	Create babel.config.js file(not .babelrc file) with code below. 
			
               ```
               module.exports = function (api) {
    			    api.cache(true);
                    const presets = [ "@babel/env"];
    			    return {
    				presets
			    };
		       	}
		       	```
			
        c.	Run `npx babel src/index.js --out-file dist/main.js` to verify
		
3. Pass control to webpack
		
		a. Install babel-loader. This loader uses @babel/core behind the scenes
			
			`yarn add --dev babel-loader`
		
		b. Create webpack.config.js and add babel-loader to it using code below. You could also add babel config to loader section  but for larger projects it is recommended to have separate babel config file
		    
		    ```
			module.exports = {
			  module: {
				rules: [
				  {
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'

				  }
				]
			  }

			};
			```

		c. Remove babel cli since we no longer need it.
		       
		  `yarn remove @babel/cli`
		        
		d. Validate Bable is configured with webpack.
		    
		    `yarn build`
		   
		e. `node main.js` outputs "Hello ME!"
		
Explanation:  Webpack uses babel-loader & babel.config.js and generates "myapp/dist/main.js"
	

#HTML


	
#### MANUAL:
		
Create myapp/dist/index.html as below.
```
<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>MANUAL</title>
        </head>
        <body>
        <script type="text/javascript" src="main.js"></script></body>
    </html>
```        

#### Using html-webpack-plugin. 
    
The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.
    
    a.  Install plugin as dev dependency.
    
        `yarn add --dev html-webpack-plugin` 
    
    b.  Add code below to webpack.config.js file
        
        `const HtmlWebpackPlugin = require('html-webpack-plugin');`
				
    c.	update webpack.config.js -> module.plugins
				
        `plugins: [new HtmlWebpackPlugin()]`
        
    d.	`yarn build`
        
        Expect: dist/index.html gets generated. "dist/index.html" is the default output path. Below is the default content of the index.html file.
        ```
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Webpack App</title>
                    </head>
                    <body>
                    <script type="text/javascript" src="main.js"></script></body>
                </html>
        ```
                
    e.	To use your own HTML template.
        
        i.  Create src/index.html file with your template:
			```		
				<!doctype html>
				<html lang="en">

				<head>
					<meta charset="utf-8">
					<meta http-equiv="x-ua-compatible" content="ie=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
					<title>My Template</title>
				</head>

				<body>
					<!-- Our  app will be mounted on this DOM element -->
					<div id="app"></div>
					<!-- Bundle will be injected below -->
				</body>

				</html>
			```	
		ii.     Update webpack config as follows:
		        
		        `const HtmlWebpackPlugin = require('html-webpack-plugin');`
		        
	    iii.    Update plugins section of module.exports with below code.
                ```   
                    module.exports = {
                    					  plugins: [
                    						new HtmlWebpackPlugin({
                    						template: './src/index.html'
                    						})
                    					]
                    					};
                ```    					
        iv.	Validate if new template is in place
        
             `yarn build`
                

#VUE

	
1.	Install Vue

    `yarn add vue`

2.	Install vue-loader and template compiler together
        
    `yarn add --d vue-loader vue-template-compiler`

3.	Update webpack.config.js -> module.rules
    
    ```
        {
          test:/\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        }
     ```

4.	Create App.vue
    ```
        <template>
            {{message}}
        </template>
    
        <script>
            export default {
              name: "app",
              data() {
                return {
                  message: "Hello from Vue!"
                };
              }
            };
        </script>
    ```
5.	Update webpack.config.js

    `const VueLoaderPlugin = require('vue-loader/lib/plugin')`
            
6.  Update webpack.config.js -> module.plugins
    ```
        plugins: [
        
                new VueLoaderPlugin()
              ]
    ```

7.  Update src/index.js
    ```
        import Vue from 'vue';
        import App from './App.vue';
        
        new Vue({
            el: '#app',
            //render: h => h(App) //Use render or spread as below
            ...App
        })
    ```
8.	Install css and vue-style loader
        
    `yarn add --dev css-loader vue-style-loader`

9.	Update webpack.config.js -> module.rules
     ``` 
        {
            test: /\.css$/,
            use: [
            'vue-style-loader',
            'css-loader'
            ]
        }
      ```  
10. Create src/index.css
    ```
        div{
        background-color: green;
        }
    ```
11. Update src/index.js.

    `import './index.css';`
    
12. `yarn build`

    Expect: Div should be green in color with "Hello from Vue!" text in it.
    
    
#QUASAR


1.	Install Quasar
        
    ` yarn add quasar`

2.	Update src/index.js
    ```
        import { Quasar, QLayout, QHeader, QDrawer, QPageContainer, QPage, QToolbar, QToolbarTitle, QBtn, QIcon, QList, QItem, QItemSection, QItemLabel, Ripple, Notify, QCircularProgress } from 'quasar/dist/quasar.common';
        import 'quasar/dist/quasar.css';
        
        Vue.use(Quasar, {
        config: {},
        components: { QLayout, QHeader, QDrawer, QPageContainer, QPage, QToolbar, QToolbarTitle, QBtn, QIcon, QList, QItem, QItemSection, QItemLabel, QCircularProgress },
        directives: { Ripple },
        plugins: { Notify }
        })
    ```
3.  Update App.vue.
    ```
        <template>
          <div>
            <q-btn color="primary" label="Primary"/>
            <q-circular-progress
              :value="value"
              size="90px"
              :thickness="0.2"
              color="orange"
              center-color="grey-8"
              track-color="transparent"
              class="q-ma-md"
            />
          </div>
        </template>
        
        <script>
            export default {
              name: "app",
              data() {
                return {
                  message: "Hello from Vue!",
                  value: 50
                };
              }
            };
        </script>
     ```  
4.	Remove code from src/index.css.

5.	`yarn build`

    Expect: A Blue colored "Primary" button and a circular progress bar.
