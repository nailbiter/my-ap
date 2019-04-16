export = index;
declare function index(props: any): any;
declare namespace index {
    class WrappedComponent {
        constructor(...args: any[]);
        componentDidMount(): void;
        componentDidUpdate(prevProps: any): void;
        componentWillUnmount(): void;
        forceUpdate(callback: any): void;
        render(): any;
        setState(partialState: any, callback: any): void;
    }
    function apply(p0: any, p1: any): any;
    function bind(p0: any): any;
    function call(p0: any): any;
    const displayName: string;
    namespace propTypes {
        function wrappedComponentRef(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace wrappedComponentRef {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
    }
}
