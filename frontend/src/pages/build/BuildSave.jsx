import { useEffect, useState } from "react";
import { getApi, deleteApi } from "../../api/api";
import LateralBar from "../../components/LateralBar/LateralBar";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./BuildSave.css";

export default function SavedBuilds() {
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const getVisibleBuilds = (buildList = []) =>
        buildList.filter((build) => build?.status !== "D");


    const handleEditBuild = (build) => {
        navigate("/build-creators", { state: { editBuild: build } });
    };

    const handleDeleteBuild = async (build) => {
        const buildName = build.build_name || "Sem Nome";
        const confirmed = window.confirm(`Tem certeza que deseja excluir a build "${buildName}"?`);
        if (!confirmed) return;

        try {
            const res = await deleteApi(`/github/calculator/delete-build/${build.id}`);
            if (res && res.success) {
                setBuilds(builds.filter((b) => b.id !== build.id));
            }
        } catch (err) {
            console.error("Erro ao excluir build:", err);
        }
    };

    useEffect(() => {
        const userStr = sessionStorage.getItem("user") || localStorage.getItem("user");
        if (userStr) {
            try {
                const userObj = JSON.parse(userStr);
                setUserId(userObj.id || userObj.usuario_id);
            } catch (e) {
                console.error("Erro ao analisar dados do usuário", e);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchBuilds = async () => {
            setLoading(true);
            try {
                const res = await getApi(`/github/calculator/saved-builds/${userId}`);
                if (res && res.success) {
                    setBuilds(getVisibleBuilds(res.builds || []));
                } else {
                    setError(res?.error || "Erro ao obter builds salvas");
                }
            } catch (err) {
                console.error("Erro ao buscar builds:", err);
                setError("Erro de rede ao buscar builds.");
            } finally {
                setLoading(false);
            }
        };

        fetchBuilds();
    }, [userId]);

    return (
        <div className="saved-builds">
            <LateralBar />
            <main className="saved-builds__main-content">
                <h1 className="saved-builds__title">Minhas Builds Salvas</h1>

                {loading ? (
                    <div style={{ textAlign: "center", color: "#c9aa71", fontFamily: "'Star Rail', sans-serif", marginTop: "40px" }}>
                        Carregando builds salvas...
                    </div>
                ) : error ? (
                    <div style={{ textAlign: "center", color: "#ff4d4d", fontFamily: "'Star Rail', sans-serif", marginTop: "40px" }}>
                        {error}
                    </div>
                ) : !userId ? (
                    <div className="saved-builds__no-login">
                        <h3>Você precisa estar logado para ver suas builds</h3>
                        <p>Faça login na sua conta para listar as builds que você configurou e salvou.</p>
                        <button className="saved-builds__login-btn" onClick={() => navigate("/login")}>
                            Ir para o Login
                        </button>
                    </div>
                ) : builds.length === 0 ? (
                    <div className="saved-builds__empty">
                        <h3>Nenhuma build salva encontrada</h3>
                        <p>Você ainda não salvou nenhuma build. Vá para a seção de criação e salve sua primeira build!</p>
                        <button className="saved-builds__login-btn" onClick={() => navigate("/build-creators")}>
                            Criar Build
                        </button>
                    </div>
                ) : (
                    <div className="saved-builds__grid">
                        {builds.map((build) => (
                            <div className="build-card" key={build.id}>
                                <div className="build-card__actions">
                                    <button 
                                        className="build-card__action-btn build-card__action-btn--edit" 
                                        onClick={() => handleEditBuild(build)}
                                        title="Editar Build"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        className="build-card__action-btn build-card__action-btn--delete" 
                                        onClick={() => handleDeleteBuild(build)}
                                        title="Excluir Build"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                                {build.character?.portrait && (
                                    <img
                                        src={build.character.portrait}
                                        alt={build.character.name}
                                        className="build-card__bg-portrait"
                                    />
                                )}

                                <div className="build-card__info">
                                    <h2 className="build-card__char-name">{build.character?.name}</h2>
                                    <p className="build-card__build-name">{build.build_name || "Sem Nome"}</p>
                                </div>

                                <div className="build-card__equipment">
                                    {/* Light Cone Icon */}
                                    {build.light_cone?.icon ? (
                                        <div className="build-card__eq-item build-card__eq-item--lightcone" title={build.light_cone.name}>
                                            <img src={build.light_cone.icon} alt={build.light_cone.name} />
                                        </div>
                                    ) : (
                                        <div className="build-card__eq-item build-card__eq-item--lightcone" title="Nenhum Cone">
                                            <img src="/icons/light-cone-icon.png" alt="Cone de Luz" style={{ opacity: 0.3 }} />
                                        </div>
                                    )}

                                    {/* Relics */}
                                    <div className="build-card__eq-item" title="Cabeça">
                                        {build.relic_icons?.head ? (
                                            <img src={build.relic_icons.head} alt="Cabeça" />
                                        ) : (
                                            <img src="/icons/relic-icon.png" alt="Cabeça" style={{ opacity: 0.3 }} />
                                        )}
                                    </div>

                                    <div className="build-card__eq-item" title="Mãos">
                                        {build.relic_icons?.hands ? (
                                            <img src={build.relic_icons.hands} alt="Mãos" />
                                        ) : (
                                            <img src="/icons/relic-icon.png" alt="Mãos" style={{ opacity: 0.3 }} />
                                        )}
                                    </div>

                                    <div className="build-card__eq-item" title="Peito">
                                        {build.relic_icons?.body ? (
                                            <img src={build.relic_icons.body} alt="Peito" />
                                        ) : (
                                            <img src="/icons/relic-icon.png" alt="Peito" style={{ opacity: 0.3 }} />
                                        )}
                                    </div>

                                    <div className="build-card__eq-item" title="Botas">
                                        {build.relic_icons?.boots ? (
                                            <img src={build.relic_icons.boots} alt="Botas" />
                                        ) : (
                                            <img src="/icons/relic-icon.png" alt="Botas" style={{ opacity: 0.3 }} />
                                        )}
                                    </div>

                                    <div className="build-card__eq-item" title="Esfera Planar">
                                        {build.relic_icons?.sphere ? (
                                            <img src={build.relic_icons.sphere} alt="Esfera Planar" />
                                        ) : (
                                            <img src="/icons/relic-icon.png" alt="Esfera Planar" style={{ opacity: 0.3 }} />
                                        )}
                                    </div>

                                    <div className="build-card__eq-item" title="Corda de Ligação">
                                        {build.relic_icons?.rope ? (
                                            <img src={build.relic_icons.rope} alt="Corda de Ligação" />
                                        ) : (
                                            <img src="/icons/relic-icon.png" alt="Corda de Ligação" style={{ opacity: 0.3 }} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
