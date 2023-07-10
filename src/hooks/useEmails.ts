import { useEffect, useState } from "react";
import { FirebaseApi } from "../lib/apiFirebase";

export function useEmails(group: string) {
  const [emails, setEmails] = useState<string[] | undefined>();

  useEffect(() => {
    FirebaseApi.instance.listEmails(group).then(setEmails);
  }, [group]);

  return emails;
}
