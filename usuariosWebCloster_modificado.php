<?php
require_once 'config.php';

// ============================================
// CONFIGURACIÓN JWT
// ============================================
// Clave secreta para firmar el token (cámbiala por algo más seguro en producción)
define('JWT_SECRET_KEY', 'mi_clave_secreta_mecodex_2024');
// Tiempo de expiración del token en segundos (24 horas)
define('JWT_EXPIRATION_TIME', 86400);

$method = $_SERVER['REQUEST_METHOD'];

// ============================================
// ENDPOINT DE LOGIN
// ============================================
// Manejar el endpoint de login
if ($method == 'POST' && isset($_GET['login'])) {
    loginUsuario();
    exit;
}

switch ($method) {
    case 'GET':
        if (isset($_GET['id']) && is_numeric($_GET['id'])) {
            getUsuario();
        } else {
            getUsuarios();
        }
        break;
    case 'POST':
        createUsuario();
        break;
    case 'PUT':
    case 'PATCH':
        updateUsuario();
        break;
    case 'DELETE':
        deleteUsuario();
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}

// ============================================
// FUNCIÓN PARA GENERAR TOKEN JWT
// ============================================
/**
 * Genera un token JWT simple
 * @param array $payload - Datos a incluir en el token (id, email, rol, etc.)
 * @return string - Token JWT generado
 */
function generarTokenJWT($payload) {
    // HEADER: Información sobre el tipo de token y algoritmo
    $header = json_encode([
        'typ' => 'JWT',
        'alg' => 'HS256' // Algoritmo de encriptación
    ]);
    
    // PAYLOAD: Datos del usuario + tiempo de expiración
    $payload['exp'] = time() + JWT_EXPIRATION_TIME; // Añadir expiración
    $payload['iat'] = time(); // Tiempo de emisión (issued at)
    
    $payloadEncoded = json_encode($payload);
    
    // Codificar en base64 (parte del estándar JWT)
    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode($payloadEncoded);
    
    // SIGNATURE: Firma digital para verificar que el token no fue modificado
    $signature = hash_hmac(
        'sha256',
        $base64UrlHeader . "." . $base64UrlPayload,
        JWT_SECRET_KEY,
        true
    );
    $base64UrlSignature = base64UrlEncode($signature);
    
    // TOKEN COMPLETO: header.payload.signature
    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

/**
 * Codifica en base64 compatible con URL (sin caracteres especiales)
 */
function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

// ============================================
// FUNCIÓN DE LOGIN (MODIFICADA PARA JWT)
// ============================================
function loginUsuario() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos JSON no válidos']);
        return;
    }
    
    // Validar campos obligatorios
    // El frontend envía 'usuario' y 'contrasena' (sin ñ)
    if (empty($input['usuario']) || empty($input['contrasena'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Usuario y contraseña son obligatorios']);
        return;
    }
    
    $pdo = getDBConnection();
    
    try {
        // Buscar usuario por correo O nombre_usuario
        $sql = "SELECT uwc.*, r.nombre_rol 
                FROM usuarios_web_closter uwc 
                LEFT JOIN roles r ON uwc.id_rol_usuario = r.id_rol 
                WHERE (uwc.correo = ? OR uwc.nombre_usuario = ?)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$input['usuario'], $input['usuario']]);
        $usuario = $stmt->fetch();
        
        // Verificar si existe el usuario Y si la contraseña coincide
        if ($usuario && $input['contrasena'] === $usuario['contrasena']) {
            
            // ============================================
            // GENERAR TOKEN JWT
            // ============================================
            // Datos que incluiremos en el token (payload)
            $tokenPayload = [
                'id_usuario_wc' => $usuario['id_usuario_wc'],
                'nombre_usuario' => $usuario['nombre_usuario'],
                'correo' => $usuario['correo'],
                'id_rol_usuario' => $usuario['id_rol_usuario'],
                'nombre_rol' => $usuario['nombre_rol']
            ];
            
            $token = generarTokenJWT($tokenPayload);
            
            // Eliminar contraseña del response por seguridad
            unset($usuario['contrasena']);
            
            // Respuesta exitosa con token
            echo json_encode([
                'success' => true,
                'message' => 'Login exitoso',
                'token' => $token, // Token JWT generado
                'data' => $usuario // Datos del usuario
            ]);
        } else {
            // Credenciales incorrectas
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'error' => 'Credenciales incorrectas'
            ]);
        }
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error en el servidor: ' . $e->getMessage()
        ]);
    }
}

// ============================================
// RESTO DE FUNCIONES CRUD (SIN CAMBIOS)
// ============================================

function getUsuarios() {
    $pdo = getDBConnection();
    
    try {
        $sql = "SELECT uwc.*, r.nombre_rol, td.nombre as tipo_documento_nombre, td.abreviatura 
                FROM usuarios_web_closter uwc 
                LEFT JOIN roles r ON uwc.id_rol_usuario = r.id_rol 
                LEFT JOIN tipo_documento td ON uwc.id_tipo_documento = td.id 
                ORDER BY uwc.id_usuario_wc DESC";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        
        $usuarios = $stmt->fetchAll();
        
        $response = [
            'success' => true,
            'data' => $usuarios,
            'total' => count($usuarios)
        ];
        
        echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al obtener usuarios: ' . $e->getMessage()
        ]);
    }
}

function getUsuario() {
    if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID de usuario no válido']);
        return;
    }
    
    $id = intval($_GET['id']);
    $pdo = getDBConnection();
    
    try {
        $sql = "SELECT uwc.*, r.nombre_rol, td.nombre as tipo_documento_nombre, td.abreviatura 
                FROM usuarios_web_closter uwc 
                LEFT JOIN roles r ON uwc.id_rol_usuario = r.id_rol 
                LEFT JOIN tipo_documento td ON uwc.id_tipo_documento = td.id 
                WHERE uwc.id_usuario_wc = ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        $usuario = $stmt->fetch();
        
        if ($usuario) {
            // Eliminar contraseña por seguridad
            unset($usuario['contrasena']);
            
            echo json_encode([
                'success' => true,
                'data' => $usuario
            ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Usuario no encontrado'
            ]);
        }
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al obtener el usuario: ' . $e->getMessage()
        ]);
    }
}

function createUsuario() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos JSON no válidos']);
        return;
    }
    
    // Campos obligatorios
    $requiredFields = ['nombre_completo', 'documento', 'contacto', 'correo', 'id_rol_usuario', 'nombre_usuario', 'contrasena'];
    foreach ($requiredFields as $field) {
        if (empty($input[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "El campo '$field' es obligatorio"]);
            return;
        }
    }
    
    $pdo = getDBConnection();
    
    try {
        // Verificar si el correo o nombre de usuario ya existen
        $checkSql = "SELECT id_usuario_wc FROM usuarios_web_closter WHERE correo = ? OR nombre_usuario = ?";
        $checkStmt = $pdo->prepare($checkSql);
        $checkStmt->execute([$input['correo'], $input['nombre_usuario']]);
        
        if ($checkStmt->fetch()) {
            http_response_code(409);
            echo json_encode([
                'success' => false,
                'error' => 'El correo o nombre de usuario ya existen en el sistema'
            ]);
            return;
        }
        
        // Campos permitidos para inserción
        $allowedFields = [
            'nombre_completo', 'id_tipo_documento', 'documento', 'contacto', 
            'correo', 'id_rol_usuario', 'nombre_usuario', 'contrasena'
        ];
        
        $fields = [];
        $placeholders = [];
        $params = [];
        
        foreach ($allowedFields as $field) {
            if (isset($input[$field])) {
                $fields[] = $field;
                $placeholders[] = "?";
                $params[] = $input[$field];
            }
        }
        
        $sql = "INSERT INTO usuarios_web_closter (" . implode(', ', $fields) . ") 
                VALUES (" . implode(', ', $placeholders) . ")";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        
        $nuevoId = $pdo->lastInsertId();
        
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Usuario creado correctamente',
            'id' => $nuevoId,
            'affected_rows' => $stmt->rowCount()
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al crear el usuario: ' . $e->getMessage()
        ]);
    }
}

function updateUsuario() {
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID de usuario no válido']);
        return;
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos JSON no válidos']);
        return;
    }
    
    $pdo = getDBConnection();
    
    try {
        // Verificar si el usuario existe
        $checkSql = "SELECT id_usuario_wc FROM usuarios_web_closter WHERE id_usuario_wc = ?";
        $checkStmt = $pdo->prepare($checkSql);
        $checkStmt->execute([$id]);
        
        if (!$checkStmt->fetch()) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Usuario no encontrado'
            ]);
            return;
        }
        
        // Verificar si el correo o nombre de usuario ya existen (excluyendo el actual)
        if (isset($input['correo']) || isset($input['nombre_usuario'])) {
            $checkDuplicateSql = "SELECT id_usuario_wc FROM usuarios_web_closter 
                                WHERE (correo = ? OR nombre_usuario = ?) AND id_usuario_wc != ?";
            $checkDuplicateStmt = $pdo->prepare($checkDuplicateSql);
            $checkDuplicateStmt->execute([
                $input['correo'] ?? '',
                $input['nombre_usuario'] ?? '',
                $id
            ]);
            
            if ($checkDuplicateStmt->fetch()) {
                http_response_code(409);
                echo json_encode([
                    'success' => false,
                    'error' => 'El correo o nombre de usuario ya existen en el sistema'
                ]);
                return;
            }
        }
        
        // Campos permitidos para actualizar
        $allowedFields = [
            'nombre_completo', 'id_tipo_documento', 'documento', 'contacto', 
            'correo', 'id_rol_usuario', 'nombre_usuario', 'contrasena'
        ];
        
        $updateFields = [];
        $params = [];
        
        foreach ($allowedFields as $field) {
            if (isset($input[$field])) {
                $updateFields[] = "$field = ?";
                $params[] = $input[$field];
            }
        }
        
        if (empty($updateFields)) {
            http_response_code(400);
            echo json_encode(['error' => 'No se proporcionaron campos válidos para actualizar']);
            return;
        }
        
        $params[] = $id;
        
        $sql = "UPDATE usuarios_web_closter SET " . implode(', ', $updateFields) . " WHERE id_usuario_wc = ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => true,
                'message' => 'Usuario actualizado correctamente',
                'affected_rows' => $stmt->rowCount()
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Usuario no encontrado o no hubo cambios'
            ]);
        }
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al actualizar el usuario: ' . $e->getMessage()
        ]);
    }
}

function deleteUsuario() {
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID de usuario no válido']);
        return;
    }
    
    $pdo = getDBConnection();
    
    try {
        // Verificar si el usuario existe
        $checkSql = "SELECT id_usuario_wc FROM usuarios_web_closter WHERE id_usuario_wc = ?";
        $checkStmt = $pdo->prepare($checkSql);
        $checkStmt->execute([$id]);
        
        if (!$checkStmt->fetch()) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Usuario no encontrado'
            ]);
            return;
        }
        
        $sql = "DELETE FROM usuarios_web_closter WHERE id_usuario_wc = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Usuario eliminado correctamente',
            'affected_rows' => $stmt->rowCount()
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error al eliminar el usuario: ' . $e->getMessage()
        ]);
    }
}
?>