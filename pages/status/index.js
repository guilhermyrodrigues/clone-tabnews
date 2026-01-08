import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Página de Status</h1>
      <UpdatedAt />
      <Dependencies />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAText = "Carregando...";

  if (!isLoading && data) {
    updatedAText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualiação: {updatedAText}</div>;
}

function Dependencies() {
  const { isLoading, error, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar!</div>;
  }

  const { version, max_connections, opened_connections } =
    data.dependencies.database;

  return (
    <>
      <h2>Dependências</h2>
      Database: Versão: {version}, Conexões Máximas: {max_connections}, Conexões
      Abertas: {opened_connections}
    </>
  );
}
