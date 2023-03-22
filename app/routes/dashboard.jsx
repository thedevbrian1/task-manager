import { useSubmit } from "@remix-run/react";

export async function action({ request }) {
    const formData = await request.formData();
    const message = formData.get('message');

    console.log('Check');
    console.log({ message });

    return null;
}

export default function Dashboard() {
    const submit = useSubmit();

    return (
        <main>
            <h1 className="text-5xl font-bold">Dashboard</h1>
            <label htmlFor="check">Check</label>
            <input
                type="checkbox"
                id="check"
                onChange={(event) => submit({ message: 'hello' }, { method: "post", replace: true })}
            />
        </main>
    );
}