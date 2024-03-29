/** Declaration file generated by dts-gen */

export = react_swipeable_routes;

declare function react_swipeable_routes(props: any): any;

declare namespace react_swipeable_routes {
    class WrappedComponent {
        constructor(...args: any[]);

        componentDidMount(): void;

        componentDidUpdate(prevProps: any): any;

        componentWillUnmount(): void;

        render(): any;

    }

    const displayName: string;

    const prototype: {
    };

    function apply(p0: any, p1: any): any;

    function bind(p0: any): any;

    function call(p0: any): any;

    namespace WrappedComponent {
        namespace prototype {
            const isMounted: any;

            const isReactComponent: {
            };

            const replaceState: any;

            function componentDidMount(): void;

            function componentDidUpdate(prevProps: any): any;

            function componentWillUnmount(): void;

            function forceUpdate(callback: any): void;

            function render(): any;

            function setState(partialState: any, callback: any): void;

            namespace componentDidMount {
                const prototype: {
                };

            }

            namespace componentDidUpdate {
                const prototype: {
                };

            }

            namespace componentWillUnmount {
                const prototype: {
                };

            }

            namespace forceUpdate {
                const prototype: {
                };

            }

            namespace render {
                const prototype: {
                };

            }

            namespace setState {
                const prototype: {
                };

            }

        }

    }

    namespace propTypes {
        function wrappedComponentRef(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        namespace wrappedComponentRef {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;

        }

    }

}

