<?php
class MyControllerPagesByAlias extends modRestController {
public $classKey = 'modResource';
public $defaultSortField = 'id';
public $defaultSortDirection = 'ASC';
public $primaryKeyField = 'alias';

    public function read($id) {
        $id = $_GET['alias'];
        $this->object = $this->modx->getObject($this->classKey, array('alias' => $id));
        if (empty($this->object)) {
            return $this->failure($this->modx->lexicon('rest.err_obj_nf',array(
                'class_key' => $this->classKey,
            )));
        }
        $objectArray = $this->object->toArray();

        $afterRead = $this->afterRead($objectArray);
        if ($afterRead !== true && $afterRead !== null) {
            return $this->failure($afterRead === false ? $this->errorMessage : $afterRead);
        }

        return $this->success('',$objectArray);
    }
}

