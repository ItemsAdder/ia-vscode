export const VANILLA_MINECRAFT_ASSETS_VERSION = '1.21.4';
export const VANILLA_TEXTURES_API_ROOT = `https://assets.mcasset.cloud/${VANILLA_MINECRAFT_ASSETS_VERSION}/assets/minecraft/textures`;

export function vanillaTextureUrl(texturePath: string): string {
	return `${VANILLA_TEXTURES_API_ROOT}/${texturePath}`;
}
