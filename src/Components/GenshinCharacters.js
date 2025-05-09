import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/GenshinCharacters.css';

const imageMap = {
  arlecchino: '/images/arlecchino.png',
  diluc: '/images/diluc.png',
  hutao: '/images/hutao.png',
  klee: '/images/klee.png',
  xiangling: '/images/xiangling.png',
  wriothesley: '/images/wriothesley.png',
  ganyu: '/images/ganyu.png',
  charlotte: '/images/charlotte.png',
  chongyun: '/images/chongyun.png',
  rosaria: '/images/rosaria.png',
  yaemiko: '/images/yaemiko.png',
  fischl: '/images/fischl.png',
  lisa: '/images/lisa.png',
  raidenshogun: '/images/raidenshogun.png',
  clorinde: '/images/clorinde.png',
  venti: '/images/venti.png',
  lynette: '/images/lynette.png',
  faruzan: '/images/faruzan.png',
  jean: '/images/jean.png',
  wanderer: '/images/wanderer.png',
  barbara: '/images/barbara.png',
  mualani: '/images/mualani.png',
  furina: '/images/furina.png',
  xingqiu: '/images/xingqiu.png',
  neuvillette: '/images/neuvillette.png',
  kinich: '/images/kinich.png',
  kirara: '/images/kirara.png',
  collei: '/images/collei.png',
  yaoyao: '/images/yaoyao.png',
  tighnari: '/images/tighnari.png',
  yunjin: '/images/yunjin.png',
  ningguang: '/images/ningguang.png',
  gorou: '/images/gorou.png',
  albedo: '/images/albedo.png',
  zhongli: '/images/zhongli.png',
  noelle: '/images/noelle.png',
  yelan: '/images/yelan.png',
  beidou: '/images/beidou.png',
  kaeya: '/images/kaeya.png',
  nahida: '/images/nahida.png',
aratakiitto: "/images/arataki.png",
  kachina: "/images/kachina.png",
  xilonen: "/images/xilonen.png",
  chiori: "/images/chiori.png",
  navia: "/images/navia.png",
  alhaitham: "/images/alhaitham.png",
  baizhu: "/images/baizhu.png",
  emilie: "/images/emilie.png",
  kaveh: "/images/kaveh.png",
  cyno: "/images/cyno.png",
  dori: "/images/dori.png",
  keqing: "/images/keqing.png",
  kukishinobu: "/images/kuki.png",
  razor: "/images/razor.png",
  sethos: "/images/sethos.png",
 kaedaharakazuha: "/images/kaedahara.png",
  sucrose: "/images/sucrose.png",
  sayu: "/images/sayu.png",
  shenhe: "/images/shenhe.png",
  qiqi: "/images/qiqi.png",
  lasignora: "/images/lasignora.png",
  layla: "/images/layla.png",
  kamisatoayaka: "/images/kamisato.png",
  freminet: "/images/freminet.png",
  eula: "/images/eula.png",
  diona: "/images/diona.png",
  candace: "/images/candace.png",
  kamisatoayato: "/images/ayato.png",
  mona: "/images/mona.png",
  nilou: "/images/nilou.png",
  sangonomiyakokomi: "/images/kokomi.png",
  sigewinne: "/images/sigewinne.png",
  tartaglia: "/images/tartaglia.png",
  yoimiya: "/images/yoimiya.png",
  bennett: "/images/bennett.png",
  chevreuse: "/images/chevreuse.png",
  dehya: "/images/dehya.png",
  yanfei: "/images/yanfei.png",
  lyney: "/images/lyney.png",
  thoma: "/images/thoma.png"
};

const GenshinCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    axios.get('/data/characters.json')
      .then(response => setCharacters(response.data))
      .catch(error => console.error('Erro ao buscar os personagens:', error));
  }, []);

  const filteredCharacters = characters
    .filter(character =>
      character.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedElement === '' || character.element.toLowerCase() === selectedElement.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const getImage = (name) => {
    const normalizedKey = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return imageMap[normalizedKey] || '/images/default.png';
  };

  return (
    <div className="container">
      <h1>Veja seus personagens favoritos</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Pesquisar personagem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <select
          value={selectedElement}
          onChange={(e) => setSelectedElement(e.target.value)}
          className="element-filter"
        >
          <option value="">Todos os Elementos</option>
          <option value="pyro">Pyro</option>
          <option value="hydro">Hydro</option>
          <option value="cryo">Cryo</option>
          <option value="electro">Electro</option>
          <option value="anemo">Anemo</option>
          <option value="geo">Geo</option>
          <option value="dendro">Dendro</option>
        </select>
      </div>

      <div className="character-list">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <div
              key={character.name}
              className={`character-card ${character.element?.toLowerCase()} character-element`}
            >
              <img
                src={getImage(character.name)}
                alt={character.name}
                className="character-image"
              />
              <h2>{character.name}</h2>
              <p>Elemento: {character.element}</p>
              <p>Tipo de Arma: {character.weapon}</p>
              <button
                className="see-more-button"
                onClick={() => setSelectedCharacter(character)}
              >
                Ver mais
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum personagem encontrado.</p>
        )}
      </div>

      {selectedCharacter && (
        <div className="modal-overlay" onClick={() => setSelectedCharacter(null)}>
          <div
            className={`modal-content ${selectedCharacter.element?.toLowerCase()}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-left">
              <img
                src={getImage(selectedCharacter.name)}
                alt={selectedCharacter.name}
                className="modal-image"
              />
            </div>
            <div className="modal-right">
              <div className="modal-info">
                <h2>{selectedCharacter.name}</h2>
                <p><strong>Elemento:</strong> {selectedCharacter.element}</p>
                <p><strong>Arma:</strong> {selectedCharacter.weapon}</p>
              </div>
              <div className="modal-description">
                <p><strong>Descrição:</strong> {selectedCharacter.description || 'Sem descrição disponível.'}</p>
              </div>
              <button
                onClick={() => setSelectedCharacter(null)}
                className="back-button"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenshinCharacters;
