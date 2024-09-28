import Button from '@/components/Button';

export default function NotFound() {
    return (
        <div id="not-found">
            <h1 className="_404">404</h1>
            <h1>Oh, something wrong...</h1>
            <p>This page has not been found</p>
            <Button type="main" href="/">To Market</Button>
            <h1 className="_404">404</h1>
        </div>
    )
}