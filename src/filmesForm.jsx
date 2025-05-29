import { useState } from 'react';

export function UserForm() {
  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [filmes, setFilmes] = useState([]);

  function adicionarFilme() {
    if (!titulo || !ano || !genero) return;

    const novoFilme = {
      id: Date.now(),
      titulo,
      ano,
      genero,
      status: 'pendente'
    };

    setFilmes([...filmes, novoFilme]);
    setTitulo('');
    setAno('');
    setGenero('');
  }

  function mudarStatus(id, novoStatus) {
    setFilmes(
      filmes.map(f =>
        f.id === id ? { ...f, status: novoStatus } : f
      )
    );
  }

  function removerFilme(id) {
    if (confirm('Tem certeza que quer remover?')) {
      setFilmes(filmes.filter(f => f.id !== id));
    }
  }

  return (
    <div>
      <h2>Adicionar Filme</h2>
      <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <input placeholder="Ano" value={ano} onChange={e => setAno(e.target.value)} />
      <input placeholder="Gênero" value={genero} onChange={e => setGenero(e.target.value)} />
      <button onClick={adicionarFilme}>Adicionar</button>

      <h3>Pendentes</h3>
      {filmes.filter(f => f.status === 'pendente').map(f => (
        <div key={f.id}>
          {f.titulo} ({f.ano}) - {f.genero}
          <button onClick={() => mudarStatus(f.id, 'assistido')}>Assistido</button>
          <button onClick={() => mudarStatus(f.id, 'favorito')}>Favorito</button>
          <button onClick={() => removerFilme(f.id)}>Remover</button>
        </div>
      ))}

      <h3>Assistidos</h3>
      {filmes.filter(f => f.status === 'assistido').map(f => (
        <div key={f.id}>
          {f.titulo} ({f.ano}) - {f.genero}
          <button onClick={() => mudarStatus(f.id, 'pendente')}>Pendente</button>
          <button onClick={() => mudarStatus(f.id, 'favorito')}>Favorito</button>
          <button onClick={() => removerFilme(f.id)}>Remover</button>
        </div>
      ))}

      <h3>Favoritos</h3>
      {filmes.filter(f => f.status === 'favorito').map(f => (
        <div key={f.id}>
          {f.titulo} ({f.ano}) - {f.genero}
          <button onClick={() => mudarStatus(f.id, 'assistido')}>Assistido</button>
          <button onClick={() => mudarStatus(f.id, 'pendente')}>Pendente</button>
          <button onClick={() => removerFilme(f.id)}>Remover</button>
        </div>
      ))}
    </div>
  );
}
