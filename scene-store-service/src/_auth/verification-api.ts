import Axios from "axios";

export async function signinWithUserCredential(payload: {
  email: string;
  password: string;
}) {
  const _r = await Axios.post(
    "https://accounts.services.grida.co/signin/with-email",
    {
      ...payload,
    }
  );

  return _r.data;
}

export async function verify(token): Promise<boolean> {
  try {
    const _r = await Axios.get<{ valid: boolean }>(
      "https://accounts.services.grida.co/verify/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return _r.data.valid;
  } catch (_) {
    return false;
  }
}
