 
#### 1) Install

```bash
npm install shark-angular2 --save
```
 
#### 2) Edit Angular 2 module

 or use SharkModule to import all of the modules at once:

```typescript
import { SharkModule } from 'shark-angular2';
...

@NgModule({
   ...
   imports: [SharkModule, ... ],
   ... 
})
```

#### 3) if you want to use [ngc] and [rollup], Edit rollup configuration (rollup-config.js)

You have to use CommonJS rollup plugin. 

```bash
npm install rollup-plugin-commonjs --save --dev
```

Then you have to import the CommonJS plugin, include it in the plugins array and add shark-angular2 to the list of modules:

```javascript
...
import commonjs from 'rollup-plugin-commonjs';
...

//paths are relative to the execution path
export default {
	...
	plugins: [
		...
		commonjs({
			include: [
				'node_modules/rxjs/**',
				'node_modules/shark-angular2/**',
				'node_modules/shark-ui/**'//because shark-angular2 depends on shark-ui
			]
		}),
		...
	]
}
```