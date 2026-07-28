import { useGameStore } from '../../store/gameStore';

function Toast() {
    const toast = useGameStore((state) => state.toast);

    if (!toast) return null;

    const isSuccess = toast.type === 'success';
    const image = isSuccess ? '/capturado.png' : '/excluido.png';

    return (
        <img
        src={image}
        alt={toast.message}
        className="fixed top-6 right-18 z-50 w-72"
        />
    );
}

export default Toast;