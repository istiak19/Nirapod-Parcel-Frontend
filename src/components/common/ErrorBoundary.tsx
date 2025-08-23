import { Component, type ReactNode } from "react";


type Props = { children: ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center h-screen">
                    <h2 className="text-lg font-semibold text-red-600">
                        Something went wrong. Please reload the page.
                    </h2>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;