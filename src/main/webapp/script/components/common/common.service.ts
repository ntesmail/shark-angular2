import { Injectable, ApplicationRef, ViewContainerRef, ComponentFactoryResolver, ReflectiveInjector,ComponentRef } from '@angular/core';

@Injectable()
export class SharkCommonService {
    private componentUUID = 1000000;
    private componentCache = new Map<number, any>();
    private rootViewContainerRef: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef
    ) { }

    public setRootViewContainerRef(value: ViewContainerRef) {
        this.rootViewContainerRef = value;
    }

    public getRootViewContainerRef(): ViewContainerRef {
        try {
            if (!this.rootViewContainerRef) {
                this.rootViewContainerRef = (this.applicationRef.components[0] as any)._component.viewContainerRef;
            }
            return this.rootViewContainerRef;
        } catch (e) {
            throw new Error(`ApplicationRef instance not found`);
        }
    }

    public appendComponentToRootByResolver(ComponentClass: any, ComponentOptionsClass: any, options: Object) {
        // 生成 componentFactory
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
        // 生成injector （根元素的injector+ComponentOptionsClass的injector）
        let rootViewContainerRef = this.getRootViewContainerRef();
        let providers = ReflectiveInjector.resolve([{ provide: ComponentOptionsClass, useValue: options }]);
        let injector = ReflectiveInjector.fromResolvedProviders(providers, rootViewContainerRef.injector);
        //create componentRef
        return rootViewContainerRef.createComponent(componentFactory, rootViewContainerRef.length, injector);
    }
}
